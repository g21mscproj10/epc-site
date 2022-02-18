from graphene import (
    ObjectType,
    String,
    Schema,
    Field,
    List,
)
import requests
import environ
import os
import pandas as pd

from api.types import Certificate, Analytics, Address, Recommendation, Big_Query

from api.resolvers.analytics import create_analytics
from api.resolvers.addresses import create_addresses
from api.resolvers.certificates import create_certificate
from api.resolvers.recommendations import create_recommendations
from api.resolvers.big_query import create_bquery

from google.cloud import bigquery

# Set the project base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

EPC_API_KEY = os.environ.get("EPC_API_KEY")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "api/.google_credentials.json"

headers = {
    "Accept": "application/json",
    "Authorization": f"Basic {EPC_API_KEY}",
}

payload = {}


class Query(ObjectType):
    address = Field(List(Address), postcode=String(default_value="N/A"))
    recommendations = Field(List(Recommendation), lmk=String(default_value="N/A"))
    analytics = Field(Analytics, postcode=String(default_value="N/A"))
    certificate = Field(Certificate, lmk=String(default_value="N/A"))
    big_query = Field(Big_Query)

    def resolve_analytics(root, info, postcode):
        if len(postcode) == 7:
            postcode = postcode[:4]
        else:
            postcode = postcode[:3]

        page_size = 5000
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()

        local_df1 = pd.DataFrame(data=data["rows"], columns=data["column-names"])

        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}&from={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()

        local_df2 = pd.DataFrame(data=data["rows"], columns=data["column-names"])

        result = pd.concat([local_df1, local_df2])
        return create_analytics(result)

    def resolve_address(root, info, postcode):
        page_size = 1000
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]
        if not data:
            return {"Error": "Invalid LMK key"}
        return create_addresses(data)

    def resolve_certificate(root, info, lmk):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]

        if not data:
            return {"Error": "Invalid LMK key"}

        return create_certificate(data)

    def resolve_recommendations(root, info, lmk):
        url = (
            f"https://epc.opendatacommunities.org/api/v1/domestic/recommendations/{lmk}"
        )
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]
        if not data:
            return {"Error": "Invalid LMK key"}

        return create_recommendations(data)

    def resolve_big_query(root, info):
        client = bigquery.Client()

        query = """
            SELECT CONSTRUCTION_AGE_BAND, CO2_EMISSIONS_CURRENT, CO2_EMISSIONS_POTENTIAL 
            FROM `arcane-sentinel-340313.test_epc.cambridge`
            WHERE CONSTRUCTION_AGE_BAND IS NOT NULL
            AND NOT (CONSTRUCTION_AGE_BAND = 'INVALID!')
            AND NOT (CONSTRUCTION_AGE_BAND = 'NO DATA!')
            AND ENVIRONMENT_IMPACT_CURRENT IS NOT NULL
        """

        local_df = (
            client.query(query)
            .result()
            .to_dataframe(
                # Optionally, explicitly request to use the BigQuery Storage API. As of
                # google-cloud-bigquery version 1.26.0 and above, the BigQuery Storage
                # API is used by default.
                create_bqstorage_client=True,
            )
        )

        return create_bquery(local_df)


schema = Schema(query=Query)

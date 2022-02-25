from graphene import (
    ObjectType,
    String,
    Schema,
    Field,
    List,
    Mutation,
    Float,
    Boolean,
)
import requests
import environ
import os
import pandas as pd
import json
from google.cloud import bigquery

from app.types import (
    Certificate,
    Analytics,
    Address,
    Timeseries,
    Improvement,
    Recommendation,
)

from app.resolvers.analytics import create_analytics
from app.resolvers.addresses import create_addresses
from app.resolvers.certificates import create_certificate
from app.resolvers.recommendations import create_recommendations
from app.resolvers.timeseries import create_timeseries
from app.models import CompletedRecommendation

# Set the project base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

EPC_API_KEY = os.environ.get("EPC_API_KEY")
ENV = os.environ.get("ENV")
if ENV == "DEV":
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "api/.google_credentials.json"

json_str = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
json_data = json.loads(json_str)
print(json_str)

json_data["private_key"] = json_data["private_key"].replace("\\n", "\n")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = json_data

print("GOOGLE_APPLICATION_CREDENTIALS")

headers = {
    "Accept": "application/json",
    "Authorization": f"Basic {EPC_API_KEY}",
}

payload = {}


class AddImprovement(Mutation):
    class Arguments:
        cost = Float()
        date = String()
        lmk_key = String()
        improvement_id = String()

    ok = Boolean()
    improvement = Field(lambda: Improvement)

    def mutate(root, info, cost, date, lmk_key, improvement_id):
        print(cost, date, lmk_key, improvement_id)
        improvement = Improvement(
            cost=cost, date=date, lmk_key=lmk_key, improvement_id=improvement_id
        )
        db_improvement = CompletedRecommendation(
            cost=cost, date=date, lmk_key=lmk_key, improvement_id=improvement_id
        )
        db_improvement.save()
        ok = True

        return AddImprovement(improvement=improvement, ok=ok)


class Mutation(ObjectType):
    add_improvement = AddImprovement.Field()


class Query(ObjectType):
    address = Field(List(Address), postcode=String(default_value="N/A"))
    recommendations = Field(List(Recommendation), lmk=String(default_value="N/A"))
    analytics = Field(Analytics, lmk=String(default_value="N/A"))
    certificate = Field(Certificate, lmk=String(default_value="N/A"))
    big_query = Field(Timeseries)

    def resolve_analytics(root, info, lmk):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]
        postcode = data["postcode"]
        if len(postcode) == 7:
            postcode = postcode[:5]
        else:
            postcode = postcode[:4]

        page_size = 1000
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()

        result = pd.DataFrame(data=data["rows"], columns=data["column-names"])

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
            SELECT * 
            FROM `arcane-sentinel-340313.test_epc.cambridge`
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
        return create_timeseries(local_df)


schema = Schema(query=Query, mutation=Mutation)

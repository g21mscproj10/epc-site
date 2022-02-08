from api.types import Certificate


def create_certificate(data):
    certificate = Certificate()
    certificate.low_energy_fixed_light_count = data["low-energy-fixed-light-count"]
    certificate.address = data["address"]
    certificate.uprn_source = data["uprn-source"]
    certificate.floor_height = data["floor-height"]
    certificate.heating_cost_potential = data["heating-cost-potential"]
    certificate.unheated_corridor_length = data["unheated-corridor-length"]
    certificate.hot_water_cost_potential = data["hot-water-cost-potential"]
    certificate.construction_age_band = data["construction-age-band"]
    certificate.potential_energy_rating = data["potential-energy-rating"]
    certificate.mainheat_energy_eff = data["mainheat-energy-eff"]
    certificate.windows_env_eff = data["windows-env-eff"]
    certificate.lighting_energy_eff = data["lighting-energy-eff"]
    certificate.environment_impact_potential = data["environment-impact-potential"]
    certificate.glazed_type = data["glazed-type"]
    certificate.heating_cost_current = data["heating-cost-current"]
    certificate.address3 = data["address3"]
    certificate.mainheatcont_description = data["mainheatcont-description"]
    certificate.sheating_energy_eff = data["sheating-energy-eff"]
    certificate.property_type = data["property-type"]
    certificate.local_authority_label = data["local-authority-label"]
    certificate.fixed_lighting_outlets_count = data["fixed-lighting-outlets-count"]
    certificate.energy_tariff = data["energy-tariff"]
    certificate.mechanical_ventilation = data["mechanical-ventilation"]
    certificate.hot_water_cost_current = data["hot-water-cost-current"]
    certificate.county = data["county"]
    certificate.postcode = data["postcode"]
    certificate.solar_water_heating_flag = data["solar-water-heating-flag"]
    certificate.constituency = data["constituency"]
    certificate.co2_emissions_potential = data["co2-emissions-potential"]
    certificate.number_heated_rooms = data["number-heated-rooms"]
    certificate.floor_description = data["floor-description"]
    certificate.energy_consumption_potential = data["energy-consumption-potential"]
    certificate.local_authority = data["local-authority"]
    certificate.built_form = data["built-form"]
    certificate.number_open_fireplaces = data["number-open-fireplaces"]
    certificate.windows_description = data["windows-description"]
    certificate.glazed_area = data["glazed-area"]
    certificate.inspection_date = data["inspection-date"]
    certificate.mains_gas_flag = data["mains-gas-flag"]
    certificate.co2_emiss_curr_per_floor_area = data["co2-emiss-curr-per-floor-area"]
    certificate.address1 = data["address1"]
    certificate.heat_loss_corridor = data["heat-loss-corridor"]
    certificate.flat_storey_count = data["flat-storey-count"]
    certificate.constituency_label = data["constituency-label"]
    certificate.roof_energy_eff = data["roof-energy-eff"]
    certificate.total_floor_area = data["total-floor-area"]
    certificate.building_reference_number = data["building-reference-number"]
    certificate.environment_impact_current = data["environment-impact-current"]
    certificate.co2_emissions_current = data["co2-emissions-current"]
    certificate.roof_description = data["roof-description"]
    certificate.floor_energy_eff = data["floor-energy-eff"]
    certificate.number_habitable_rooms = data["number-habitable-rooms"]
    certificate.address2 = data["address2"]
    certificate.hot_water_env_eff = data["hot-water-env-eff"]
    certificate.posttown = data["posttown"]
    certificate.mainheatc_energy_eff = data["mainheatc-energy-eff"]
    certificate.main_fuel = data["main-fuel"]
    certificate.lighting_env_eff = data["lighting-env-eff"]
    certificate.windows_energy_eff = data["windows-energy-eff"]
    certificate.floor_env_eff = data["floor-env-eff"]
    certificate.lighting_description = data["lighting-description"]
    certificate.roof_env_eff = data["roof-env-eff"]
    certificate.walls_energy_eff = data["walls-energy-eff"]
    certificate.photo_supply = data["photo-supply"]
    certificate.lighting_cost_potential = data["lighting-cost-potential"]
    certificate.mainheat_env_eff = data["mainheat-env-eff"]
    certificate.multi_glaze_proportion = data["multi-glaze-proportion"]
    certificate.main_heating_controls = data["main-heating-controls"]
    certificate.lodgement_datetime = data["lodgement-datetime"]
    certificate.flat_top_storey = data["flat-top-storey"]
    certificate.current_energy_rating = data["current-energy-rating"]
    certificate.secondheat_description = data["secondheat-description"]
    certificate.walls_env_eff = data["walls-env-eff"]
    certificate.transaction_type = data["transaction-type"]
    certificate.uprn = data["uprn"]
    certificate.current_energy_efficiency = data["current-energy-efficiency"]
    certificate.energy_consumption_current = data["energy-consumption-current"]
    certificate.mainheat_description = data["mainheat-description"]
    certificate.lighting_cost_current = data["lighting-cost-current"]
    certificate.lodgement_date = data["lodgement-date"]
    certificate.extension_count = data["extension-count"]
    certificate.mainheatc_env_eff = data["mainheatc-env-eff"]
    certificate.lmk_key = data["lmk-key"]
    certificate.wind_turbine_count = data["wind-turbine-count"]
    certificate.tenure = data["tenure"]
    certificate.floor_level = data["floor-level"]
    certificate.potential_energy_efficiency = data["potential-energy-efficiency"]
    certificate.hot_water_energy_eff = data["hot-water-energy-eff"]
    certificate.low_energy_lighting = data["low-energy-lighting"]
    certificate.walls_description = data["walls-description"]
    certificate.hotwater_description = data["hotwater-description"]
    return certificate
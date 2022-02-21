from graphene import (
    ObjectType,
    String,
    List,
    Int,
    Float,
    Date,
    DateTime,
)


class Certificate(ObjectType):
    low_energy_fixed_light_count = Float()
    address = String()
    uprn_source = String()
    floor_height = Float()
    heating_cost_potential = Float()
    unheated_corridor_length = Float()
    hot_water_cost_potential = Float()
    construction_age_band = String()
    potential_energy_rating = String()
    mainheat_energy_eff = Float()
    windows_env_eff = Float()
    lighting_energy_eff = Float()
    environment_impact_potential = Float()
    glazed_type = String()
    heating_cost_current = Float()
    address3 = String()
    mainheatcont_description = String()
    sheating_energy_eff = Float()
    property_type = String()
    local_authority_label = String()
    fixed_lighting_outlets_count = Float()
    energy_tariff = String()
    mechanical_ventilation = String()
    hot_water_cost_current = Float()
    county = String()
    postcode = String()
    solar_water_heating_flag = String()
    constituency = String()
    co2_emissions_potential = Float()
    number_heated_rooms = Float()
    floor_description = String()
    energy_consumption_potential = Float()
    local_authority = String()
    built_form = String()
    number_open_fireplaces = Float()
    windows_description = String()
    glazed_area = String()
    inspection_date = Date()
    mains_gas_flag = String()
    co2_emiss_curr_per_floor_area = Float()
    address1 = String()
    heat_loss_corridor = String()
    flat_storey_count = Float()
    constituency_label = String()
    roof_energy_eff = Float()
    total_floor_area = Float()
    building_reference_number = String()
    environment_impact_current = Float()
    co2_emissions_current = Float()
    roof_description = String()
    floor_energy_eff = Float()
    number_habitable_rooms = Float()
    address2 = String()
    hot_water_env_eff = Float()
    posttown = String()
    mainheatc_energy_eff = Float()
    main_fuel = String()
    lighting_env_eff = Float()
    windows_energy_eff = Float()
    floor_env_eff = Float()
    lighting_description = String()
    roof_env_eff = Float()
    walls_energy_eff = Float()
    photo_supply = Float()
    lighting_cost_potential = Float()
    mainheat_env_eff = Float()
    multi_glaze_proportion = Float()
    main_heating_controls = String()
    lodgement_datetime = DateTime()
    flat_top_storey = String()
    current_energy_rating = String()
    secondheat_description = String()
    walls_env_eff = Float()
    transaction_type = String()
    uprn = String()
    current_energy_efficiency = Float()
    energy_consumption_current = Float()
    mainheat_description = String()
    lighting_cost_current = Float()
    lodgement_date = Date()
    extension_count = Float()
    mainheatc_env_eff = Float()
    lmk_key = String(required=True)
    wind_turbine_count = Float()
    tenure = String()
    floor_level = String()
    potential_energy_efficiency = Float()
    hot_water_energy_eff = Float()
    low_energy_lighting = Float()
    walls_description = String()
    hotwater_description = String()


class Analytics(ObjectType):
    # mean_energy_rating =  Char() # Returns a char, need method to get means
    number_of_houses = Int()
    mean_current_energy_efficiency = Float()
    mean_current_environment_impact = Float()
    mean_current_energy_consumption = Float()
    mean_current_co2_consumption = Float()
    mean_current_lighting_cost = Float()
    mean_current_heating_cost = Float()
    mean_current_hot_water_cost = Float()
    mean_potential_energy_efficiency = Float()
    mean_potential_environment_impact = Float()
    mean_potential_energy_consumption = Float()
    mean_potential_co2_consumption = Float()
    mean_potential_lighting_cost = Float()
    mean_potential_heating_cost = Float()
    mean_potential_hot_water_cost = Float()
    normalised_current_energy_efficiency = List(Float)
    normalised_current_environment_impact = List(Float)
    normalised_current_energy_consumption = List(Float)
    normalised_current_co2_consumption = List(Float)
    normalised_current_lighting_cost = List(Float)
    normalised_current_heating_cost = List(Float)
    normalised_current_hot_water_cost = List(Float)

    # average ratings for house tile comparisons
    mean_low_energy_lighting = Float()
    mean_lighting_energy_eff = Float()
    mean_lighting_environmental_eff = Float()
    mean_walls_energy_eff = Float()
    mean_walls_environmental_eff = Float()
    mean_water_energy_eff = Float()
    mean_water_environmental_eff = Float()
    mean_floor_energy_eff = Float()
    mean_floor_environmental_eff = Float()
    mean_roof_energy_eff = Float()
    mean_roof_environmental_eff = Float()
    mean_main_heating_energy_eff = Float()
    mean_main_heating_environmental_eff = Float()
    mean_main_heating_controls_energy_eff = Float()
    mean_main_heating_controls_environmental_eff = Float()
    mean_second_heating_energy_eff = Float()
    mean_second_heating_environmental_eff = Float()


class Address(ObjectType):
    lmk_key = String(required=True)
    address = String()


class Recommendation(ObjectType):
    lmk_key = String(required=True)
    improvement_item = Int()
    indicative_cost = String()
    improvement_summary_text = String()
    improvement_descr_text = String()
    improvement_id = String()
    improvement_id_text = String()


# test
class Big_Query(ObjectType):
    co2_average = Float()

class Improvement(ObjectType):
    lmk_key = String(required=True)
    cost = Float()
    date = Date()
    improvement_id = String()

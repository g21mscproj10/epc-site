import { DocumentNode, gql } from "@apollo/client";
import type { epcCertificateObject } from "../../types";

export const GET_ADDRESSES = gql`
  query address($queryParam: String!) {
    address(postcode: $queryParam) {
      lmkKey
      address
    }
  }
`;

export const GET_CERTIFICATES = gql`
  query certificate($queryParam: String!) {
    certificate(lmk: $queryParam) {
      address
      address2
      address3
      localAuthorityLabel
      posttown
      county
      currentEnergyRating
      postcode
      potentialEnergyRating
      co2EmissionsCurrent
      co2EmissionsPotential
      co2EmissCurrPerFloorArea
      propertyType
      builtForm
      constructionAgeBand
      totalFloorArea
      energyTariff
      environmentImpactPotential
      environmentImpactCurrent
      energyConsumptionPotential
      energyConsumptionCurrent
      roofDescription
      roofEnergyEff
      roofEnvEff
      windowsDescription
      windowsEnvEff
      windowsEnergyEff
      glazedType
      glazedArea
      multiGlazeProportion
      mainsGasFlag
      numberHeatedRooms
      heatLossCorridor
      unheatedCorridorLength
      mainheatDescription
      mainheatEnvEff
      mainheatEnergyEff
      mainFuel
      mainheatcontDescription
      mainheatcEnergyEff
      mainheatcEnvEff
      secondheatDescription
      sheatingEnergyEff
      lowEnergyLighting
      lightingEnergyEff
      lightingEnvEff
      wallsDescription
      wallsEnergyEff
      wallsEnvEff
      hotwaterDescription
      hotWaterEnvEff
      hotWaterEnergyEff
      floorDescription
      floorEnergyEff
      floorEnvEff
      photoSupply
      solarWaterHeatingFlag
      mechanicalVentilation
      floorLevel
      flatStoreyCount
      flatTopStorey
      inspectionDate
      heatingCostPotential
      hotWaterCostPotential
      heatingCostCurrent
      hotWaterCostCurrent
      lightingCostPotential
      lightingCostCurrent
      currentEnergyEfficiency
      potentialEnergyEfficiency
    }
    analytics(lmk: $queryParam) {
      meanCurrentEnergyEfficiency
      meanCurrentEnergyRating
      meanCurrentEnvironmentImpact
      meanCurrentCo2Consumption
      meanCurrentEnergyConsumption
      meanCurrentHeatingCost
      meanCurrentHotWaterCost
      meanCurrentLightingCost
      meanWallsEnergyEff
      meanWallsEnvironmentalEff
      meanRoofEnergyEff
      meanRoofEnvironmentalEff
      meanWaterEnergyEff
      meanWaterEnvironmentalEff
      meanMainHeatingEnergyEff
      meanMainHeatingEnvironmentalEff
      meanLightingEnergyEff
      meanLightingEnvironmentalEff
      meanFloorEnergyEff
      meanFloorEnvironmentalEff
      meanWindowsEnergyEff
      meanWindowsEnvironmentalEff
    }
  }
`;

export const GET_REC_DATA = gql`
  query get_data($queryParam: String!) {
    recommendations(lmk: $queryParam) {
      lmkKey
      indicativeCost
      improvementIdText
      improvementItem
      improvementId
      improvementId
      date
      cost
      postcode
      completed
    }
    certificate(lmk: $queryParam) {
      address
      posttown
      postcode
      heatingCostPotential
      heatingCostCurrent
      lightingCostPotential
      lightingCostCurrent
      hotWaterCostPotential
      hotWaterCostCurrent
    }
  }
`;

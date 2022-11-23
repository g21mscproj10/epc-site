import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/generic/layout';
import DashboardWrapper from '../components/sidebarNew';
import {
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { GET_BQ_DATA } from './api/queries';
import { useQuery } from '@apollo/client';
import { BQBarData, BQTimeSeriesData } from '../types';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Lottie from 'react-lottie-player';
import loadingJson from '../assets/animations/animation/loading.json';
import errorJson from '../assets/animations/animation/error.json';
import Modal from '../components/generic/modal';
import HelpModal from '../components/dashboard/helpModal';
import { IoIosArrowDropdown } from 'react-icons/io';
import { AiFillQuestionCircle } from 'react-icons/ai';

const Main = () => {
  const [barData, setBarData] = useState<BQBarData[]>();
  const [timeseriesData, setTimeseriesData] = useState<BQTimeSeriesData>();
  const [selectedTimeSeries, setSelectedTimeSeries] =
    useState<{ year: string; Stars: number }[]>();
  const [activeCategory, setActiveCategory] = useState<string>(
    'Lighting Energy Efficiency'
  );
  const [modalContent, setModalContent] = useState<string>('');
  const [smallScreen, setSmallScreen] = useState(false);
  const { loading, error, data } = useQuery(GET_BQ_DATA, {});

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  function formatTimeseries(data: number[]) {
    return data.map((dataPoint: number, index: number) => {
      return {
        year: (2008 + index).toString(),
        Stars: dataPoint,
      };
    });
  }

  const categories = [
    { value: 'LightingEnergyEff', name: 'Lighting Energy Efficiency' },
    {
      value: 'LightingEnvironmentalEff',
      name: 'Lighting Environmental Efficiency',
    },
    { value: 'WallsEnergyEff', name: 'Walls Energy Efficiency' },
    { value: 'WallsEnvironmentalEff', name: 'Walls Environmental Efficiency' },
    { value: 'WaterEnergyEff', name: 'Water Energy Efficiency' },
    { value: 'WaterEnvironmentalEff', name: 'Water Environmental Efficiency' },
    { value: 'FloorEnergyEff', name: 'Floor Energy Efficiency' },
    { value: 'FloorEnvironmentalEff', name: 'Floor Environmental Efficiency' },
    { value: 'RoofEnergyEff', name: 'Roof Energy Efficiency' },
    { value: 'RoofEnvironmentalEff', name: 'Roof Environmental Efficiency' },
    { value: 'MainHeatingEnergyEff', name: 'Main Heating Energy Efficiency' },
    {
      value: 'MainHeatingEnvironmentalEff',
      name: 'Main Heating Environmental Efficiency',
    },
    {
      value: 'MainHeatingControlsEnergyEff',
      name: 'Main Heating Controls Energy Efficiency',
    },
    {
      value: 'MainHeatingControlsEnvironmentalEff',
      name: 'Main Heating Controls Environmental Efficiency',
    },
    { value: 'WindowsEnergyEff', name: 'Windows Energy Efficiency' },
    {
      value: 'WindowsEnvironmentalEff',
      name: 'Windows Environmental Efficiency',
    },
  ];

  useEffect(() => {
    if (data) {
      setBarData(
        [
          {
            name: 'Lighting Energy Efficiency',
            value: data.bigQuery.averageAnnualChangeLightingEnergyEff,
          },
          {
            name: 'Lighting Environmental Efficiency',
            value: data.bigQuery.averageAnnualChangeLightingEnvironmentalEff,
          },
          {
            name: 'Walls Energy Efficiency',
            value: data.bigQuery.averageAnnualChangeWallsEnergyEff,
          },
          {
            name: 'Walls Environmental Efficiency',
            value: data.bigQuery.averageAnnualChangeWallsEnvironmentalEff,
          },
          {
            name: 'Water Energy Efficiency',
            value: data.bigQuery.averageAnnualChangeWaterEnergyEff,
          },
          {
            name: 'Water Environmental Efficiency',
            value: data.bigQuery.averageAnnualChangeWaterEnvironmentalEff,
          },
          {
            name: 'Floor Energy Efficiency',
            value: data.bigQuery.averageAnnualChangeFloorEnergyEff,
          },
          {
            name: 'Floor Environmental Efficiency',
            value: data.bigQuery.averageAnnualChangeFloorEnvironmentalEff,
          },
          {
            name: 'Roof Energy Efficiency',
            value: data.bigQuery.averageAnnualChangeRoofEnergyEff,
          },
          {
            name: 'Roof Environmental Efficiency',
            value: data.bigQuery.averageAnnualChangeRoofEnvironmentalEff,
          },
          {
            name: 'Heating Energy Efficiency',
            value: data.bigQuery.averageAnnualChangeMainHeatingEnergyEff,
          },
          {
            name: 'Heating Environmental Efficiency',
            value: data.bigQuery.averageAnnualChangeMainHeatingEnvironmentalEff,
          },
          {
            name: 'Heating Controls Energy Efficiency',
            value:
              data.bigQuery.averageAnnualChangeMainHeatingControlsEnergyEff,
          },
          {
            name: 'Heating Controls Environmental Efficiency',
            value:
              data.bigQuery
                .averageAnnualChangeMainHeatingControlsEnvironmentalEff,
          },
          {
            name: 'Windows Energy Efficiency',
            value: data.bigQuery.averageAnnualChangeWindowsEnergyEff,
          },
          {
            name: 'Windows Environmental Efficiency',
            value: data.bigQuery.averageAnnualChangeWindowsEnvironmentalEff,
          },
        ].sort((a, b) => (a.value < b.value ? 1 : -1))
      );
      setTimeseriesData({
        LightingEnergyEff: data.bigQuery.averageTimeseriesLightingEnergyEff,
        LightingEnvironmentalEff:
          data.bigQuery.averageTimeseriesLightingEnvironmentalEff,
        WallsEnergyEff: data.bigQuery.averageTimeseriesWallsEnergyEff,
        WallsEnvironmentalEff:
          data.bigQuery.averageTimeseriesWallsEnvironmentalEff,
        WaterEnergyEff: data.bigQuery.averageTimeseriesWaterEnergyEff,
        WaterEnvironmentalEff:
          data.bigQuery.averageTimeseriesWaterEnvironmentalEff,
        FloorEnergyEff: data.bigQuery.averageTimeseriesFloorEnergyEff,
        FloorEnvironmentalEff:
          data.bigQuery.averageTimeseriesFloorEnvironmentalEff,
        RoofEnergyEff: data.bigQuery.averageTimeseriesRoofEnergyEff,
        RoofEnvironmentalEff:
          data.bigQuery.averageTimeseriesRoofEnvironmentalEff,
        MainHeatingEnergyEff:
          data.bigQuery.averageTimeseriesMainHeatingEnergyEff,
        MainHeatingEnvironmentalEff:
          data.bigQuery.averageTimeseriesMainHeatingEnvironmentalEff,
        MainHeatingControlsEnergyEff:
          data.bigQuery.averageTimeseriesMainHeatingControlsEnergyEff,
        MainHeatingControlsEnvironmentalEff:
          data.bigQuery.averageTimeseriesMainHeatingControlsEnvironmentalEff,
        WindowsEnergyEff: data.bigQuery.averageTimeseriesWindowsEnergyEff,
        WindowsEnvironmentalEff:
          data.bigQuery.averageTimeseriesWindowsEnvironmentalEff,
      });
      setSelectedTimeSeries(
        formatTimeseries(data.bigQuery.averageTimeseriesLightingEnergyEff)
      );
    }
  }, [data]);

  useEffect(() => {
    if (window.matchMedia('(max-width: 460px)').matches) {
      setSmallScreen(true);
    }
  }, []);

  return (
    <DashboardWrapper
      pageTitle="Analysis"
      subTitle={'Cambridge'}
      analysis
      setModalContent={''}
      currentPage="Analysis"
    >
      {data ? (
        <section className="text-gray-600 body-font overflow-x-hidden">
          <div className="container flex flex-col lg:flex-row px-2 py-2 mx-auto">
            <div className="lg:w-1/2 lg:pr-2 lg:border-r lg:border-b-0 lg:mb-0 border-b border-gray-200 relative">
              <div className="w-full border-2 border-x-0 border-t-0 lg:relative mb-4 text-left">
                <div className="px-4 font-medium text-xl items-center flex gap-3">
                  Average Household Improvement Per Year
                  <AiFillQuestionCircle
                    size={16}
                    className="hover:cursor-pointer"
                    onClick={() => setModalContent('BQimprovements')}
                  />
                </div>
                <div className="p-4 py-2 font-light text-sm text-left">
                  For households that have submitted 2+ EPC reports
                </div>
                {smallScreen ? (
                  <div className="p-4 py-2 font-light text-sm text-left italic">
                    Tap on the bar to see the category.
                  </div>
                ) : null}
              </div>
              {barData && (
                <ResponsiveContainer width={'100%'} height={520}>
                  <BarChart
                    style={
                      smallScreen
                        ? { position: 'relative' }
                        : { position: 'relative', left: '-100px' }
                    }
                    layout="vertical"
                    width={560}
                    height={520}
                    data={barData}
                    barCategoryGap={4}
                  >
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={false}
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        Math.round((value + Number.EPSILON) * 100) / 100
                      }
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={smallScreen ? 0 : 300}
                      tick={{ fontSize: 11 }}
                    />
                    <Bar dataKey="value" fill="#19b45a" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="lg:w-1/2 lg:pr-2 flex flex-col items-center md:items-startx lg:pl-2 relative">
              {timeseriesData && (
                <>
                  <div className="w-full border-2 border-x-0 border-t-0 lg:relative lg:left-5 mb-4 text-left">
                    <div className="px-4 font-medium text-xl flex gap-3 items-center">
                      Average Rating For EPC Reports Published Each Year
                      <AiFillQuestionCircle
                        size={16}
                        className="hover:cursor-pointer"
                        onClick={() => setModalContent('BQtimeseries')}
                      />
                    </div>
                    <div className="p-4 py-2 font-light text-sm">
                      Based on all EPC reports published in the region since
                      2008
                    </div>
                  </div>
                  <ResponsiveContainer width={'100%'} height={350}>
                    <LineChart
                      width={640}
                      height={350}
                      data={selectedTimeSeries}
                    >
                      <CartesianGrid strokeDasharray="1 1" />
                      <XAxis dataKey="year" interval={2} />
                      <YAxis
                        type="number"
                        ticks={[1, 2, 3, 4, 5]}
                        domain={[0, 5]}
                      />
                      <Tooltip
                        formatter={(value: number) =>
                          Math.round((value + Number.EPSILON) * 100) / 100
                        }
                      />
                      <Line type="monotone" dataKey="Stars" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>

                  <div className="flex justify-center items-center gap-2 relative w-full">
                    <b>Select Category: </b>
                    <Menu
                      as="div"
                      className="relative inline-block text-left w-5/12"
                    >
                      <div>
                        <Menu.Button className="inline-flex items-center gap-2 justify-center w-full rounded-sm shadow-sm border px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          {activeCategory}
                          <IoIosArrowDropdown />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="overflow-scroll h-44 origin-top-right absolute right-0 w-64 lg:top-5 bottom-20 mt-2 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {categories.map(
                              (category: { name: string; value: string }) => (
                                <Menu.Item key={category.name}>
                                  {({ active }) => (
                                    <a
                                      onClick={(e) => {
                                        setActiveCategory(category.name);
                                        setSelectedTimeSeries(
                                          formatTimeseries(
                                            timeseriesData[category.value]
                                          )
                                        );
                                      }}
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      {category.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              )
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </>
              )}
            </div>
          </div>

          {modalContent !== '' ? (
            <Modal hideModal={() => setModalContent('')}>
              <HelpModal type={modalContent} />
            </Modal>
          ) : null}
        </section>
      ) : (
        <>
          {/*Loading Display*/}
          {loading ? (
            <div className="relative top-[20vh] w-full flex flex-col justify-center items-center bg-gray-100">
              <Lottie
                loop
                animationData={loadingJson}
                play
                style={{ width: 300, height: 300 }}
              />
            </div>
          ) : (
            <>
              {/*Error Display*/}
              {error && !data ? (
                <div className="w-full flex flex-col justify-center items-center bg-gray-100">
                  <h1 className="animate-fade text-3xl font-bold pb-2">
                    Oops, there was an error, try again later...
                  </h1>
                  <Lottie
                    animationData={errorJson}
                    play
                    style={{ width: 150, height: 150 }}
                  />
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </DashboardWrapper>
  );
};

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Address Dashboard">{page}</Layout>;
};

export default Main;

import { ReactElement, useEffect, useState } from 'react';
import Router from 'next/router';
import Layout from '../components/generic/layout';
import { gql, useQuery } from '@apollo/client';
import Circle from '../assets/circle.svg';
import SearchBar from '../components/landing/search-bar';
import AddressModal from '../components/landing/addressModal';
import { useAppContext } from '../context/state';
import _ from 'lodash';
import Footer from '../components/generic/footer';

const GET_ADDRESSES = gql`
  query address($queryParam: String!) {
    address(postcode: $queryParam) {
      lmkKey
      address
    }
  }
`;

const PING_SERVER = gql`
  query ping($pingParam: String!) {
    address(postcode: $pingParam) {
      lmkKey
    }
  }
`;

type AddressObject = {
  address: string;
  lmkKey: string;
};

const formatPostcode = (postcode: string): string => {
  let strippedPostcode = postcode.replace(/\s+/g, '');
  if (strippedPostcode.length < 5 || strippedPostcode.length > 7) return '';
  let arr = [...strippedPostcode];
  if (strippedPostcode.length == 5) {
    arr.splice(2, 0, ' ');
  } else if (strippedPostcode.length == 6) {
    arr.splice(3, 0, ' ');
  } else if (strippedPostcode.length == 7) {
    arr.splice(4, 0, ' ');
  }
  let formatted = arr.join('');
  return formatted;
};

const isValidPostcode = (postcode: string): boolean => {
  // allows some non-real postcodes: https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
  let formatted = formatPostcode(postcode);
  if (!formatted) return false;
  let postcodeRegex = new RegExp(
    '^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|' +
      '(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y]' +
      '[0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$'
  );
  return postcodeRegex.test(formatted);
};

const Landing = () => {
  const [searchBoxText, setSearchBoxText] = useState<string>('');
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [queryData, setQueryData] = useState<Array<AddressObject>>([]);
  const [queryParam, setQueryParam] = useState<string>('');
  const [activeAddressModal, setActiveAddressModal] = useState<boolean>(false);
  const GlobalContext = useAppContext();

  const { loading, error, data } = useQuery(GET_ADDRESSES, {
    skip: !queryParam || isQueryError,
    variables: { queryParam },
  });

  const handleSearchSubmit = (): void => {
    if (!isValidPostcode(searchBoxText)) {
      setIsInputError(true);
    } else {
      let formatted = formatPostcode(searchBoxText);
      let queryFormattedPostcode = formatted.replace(/\s+/g, '');
      setQueryParam(queryFormattedPostcode);
      setIsInputError(false);
      setActiveAddressModal(true);
    }
  };

  const handleSearchInput = (inputValue: string): void => {
    setSearchBoxText(inputValue);
    if (!inputValue) {
      setIsInputError(false);
      setIsQueryError(false);
    }
  };

  const handleBack = (): void => {
    setIsInputError(false);
    setActiveAddressModal(false);
    setIsQueryError(false);
    setQueryParam('');
    setSearchBoxText('');
  };

  const handleSelection = (lmk: string): void => {
    GlobalContext.setActiveLmk(lmk);
    Router.push('/main');
  };

  useEffect(() => {
    if (error) {
      setIsQueryError(true);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.address) {
      let temp = [...data.address];
      let unique = _.uniqBy(temp, 'address');
      unique.sort((a: any, b: any) => (a.address < b.address ? 1 : -1));
      setQueryData(unique);
    }
  }, [data]);

  return (
    <div className={'overflow-hidden h-screen w-screen'}>
      <div
        className={
          'w-full h-[100vh] flex-col content-center transition-all duration-500 ' +
          (activeAddressModal ? 'mt-[2vh]' : 'mt-[calc(50vh-199px-7.5vh)]')
        }
      >
        <div className="text-gray-900 font-logoFont font-black text-[3rem] md:text-[6rem] text-center tracking-tight">
          GreenHouse
        </div>
        <div className="flex justify-center">
          {activeAddressModal ? null : (
            <SearchBar
              searchTextValue={'Search by Postcode'}
              width={'w-[30vw] max-w-[325px]'}
              inputHandler={handleSearchInput}
              submitHandler={handleSearchSubmit}
              isError={isInputError}
            />
          )}
          {activeAddressModal ? (
            <AddressModal
              isLoading={loading}
              isError={isQueryError}
              data={queryData}
              backHandler={handleBack}
              selectionHandler={handleSelection}
            />
          ) : null}
        </div>
        {isInputError ? (
          <div className="w-full flex justify-center mt-[2px] text-red-500 font-logoFont">
            Please enter a valid UK Postcode
          </div>
        ) : null}
      </div>
      {/* <House className="absolute z-10 left-[calc(50vw-75px)] top-[65vh] w-[150px] h-[150px]" /> */}
      <Circle
        className={
          'fixed top left-[calc(50%-40vw)] w-[80vw] fill-lightGreen transition-all duration-500 ' +
          (activeAddressModal ? 'top-[78vh] ' : 'top-[72vh] ') +
          (activeAddressModal ? 'md:top-[75vh]' : 'md:top-[55vh]')
        }
      />
    </div>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'GreenHouse'}>
      {page}
      <Footer />
    </Layout>
  );
};

export default Landing;

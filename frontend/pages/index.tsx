import { ReactElement, useEffect, useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layout';
import { gql, useQuery } from '@apollo/client';
import Circle from '../assets/circle.svg';
import House from '../assets/house.svg';
import SearchBar from '../components/search-bar';
import AddressModal from '../components/addressModal';
import { useAppContext } from '../context/state';
import { ifError } from 'assert';

const GET_ADDRESSES = gql`
  query Address($queryParam: String!) {
    address(name: $queryParam)
  }
`;

type AddressObject = {
  address: string;
  lmk: string;
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

  //Reset active lmk on component mount only, will make sure state is clean when using browser back button
  useEffect(() => {
    GlobalContext.setActiveLmk('');
  }, []);

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

  const handleSearchInput = (inputValue: string) => {
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
      console.log(error);
    }
  }, [error]);

  console.log(isQueryError);

  useEffect(() => {
    if (data) {
      let parsedData = JSON.parse(data.address);
      setQueryData(parsedData);
    }
  }, [data]);

  return (
    <div className={"overflow-hidden h-screen w-screen"}>
      <div
        className={
          'w-full h-[100vh] flex-col content-center transistion-all duration-500 ' +
          (activeAddressModal ? 'mt-[2vh]' : 'mt-[calc(50vh-199px-7.5vh)]')
        }
      >
        <div className="text-black font-logoFont font-black text-[6rem] text-center tracking-tight">
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
          (activeAddressModal ? 'top-[75vh]' : 'top-[55vh]')
        }
      />
    </div>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout title={'GreenHouse'}>{page}</Layout>;
};

export default Landing;

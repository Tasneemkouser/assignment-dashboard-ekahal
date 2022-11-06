import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import services from "../api/apiServices";
import { getYearsRange } from "../utils";

const seasonalTemperatureContext = createContext({});
const YEAR_RANGE = 10;
const START_YEAR = 1901;
const END_YEAR = 2015;

export default function SeasonalTemperatureProvider({ children }) {
  const [seletedRange, setSelectedRange] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await services.fetchTemperature({
        offset: seletedRange * YEAR_RANGE
      });
      setApiResponse(response);
    })();
  }, [seletedRange]);

  const years = useMemo(() => {
    return getYearsRange(START_YEAR, END_YEAR, YEAR_RANGE).map(
      (rangeYears, idx) => ({
        title: rangeYears.join("-"),
        itemId: `#${idx * YEAR_RANGE}`,
        rangeYears
      })
    );
  }, []);

  const yearRange = useMemo(() => {
    if (years.length <= 0) return [];
    const [startYear, endYear] = years[seletedRange].rangeYears;
    let ranges = [];
    for (let i = startYear; i <= endYear; i++) {
      ranges.push(i);
    }
    return ranges;
  }, [years, seletedRange]);

  const currentYearRange = useMemo(() => {
    if (!yearRange.length) return [];
    return [yearRange[0], yearRange[yearRange.length - 1]];
  }, [yearRange]);

  const dataProperties = useMemo(() => {
    if (!apiResponse) return [];
    const { field = [], records = [] } = apiResponse || {};
    const fields = field.slice(1, field.length - 5);
    const reasonalFields = field.slice(field.length - 4);

    const yearWiseInfo = records.map((record) => {
      return {
        name: +record._year,
        temp: +record.annual,
        ...reasonalFields.reduce((prev, curr) => {
          prev[curr.id] = +record[curr.id];
          return prev;
        }, {})
      };
    });

    return {
      fields,
      reasonalFields,
      records,
      yearWiseInfo
    };
  }, [apiResponse]);

  return (
    <seasonalTemperatureContext.Provider
      value={{
        years,
        yearRange,
        setSelectedRange,
        currentYearRange,
        ...dataProperties
      }}
    >
      {children}
    </seasonalTemperatureContext.Provider>
  );
}

export const useData = () => useContext(seasonalTemperatureContext);

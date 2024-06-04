"use client";
import { useSelector } from "react-redux";

export default function Configuration() {
    interface RootState {
        filter: {
          filterDetails: any; // Define the type of filterDetails
        };
      }
    const storeFilterData = useSelector((state: RootState) => state.filter.filterDetails);
    console.log(storeFilterData);

    return (
        <>
            <h1>Configuration</h1>
            <div>
                {storeFilterData && Object.entries(storeFilterData)?.map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {value as React.ReactNode}
                    </div>
                ))}
            </div>
        </>
    );

}
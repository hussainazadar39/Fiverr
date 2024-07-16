"use client"
import {motion} from "framer-motion"
import countryLookUp from "country-code-lookup"
import React, { useEffect } from "react"
import { getIpAddressInfo } from "@/utils/ipAddress"
import { useQuery } from "@tanstack/react-query"
import { appConfig } from "@/config"
import { useCountrySymbolStore } from "@/store/countrySymbol"
import { CountryInfoDb } from "@/db/modals/countryDb"
import { useCountriesVotesStore } from "@/store/countriesDb"


export const LeaderBoard : React.FC<{ipAddress : string  , countriesVotes : CountryInfoDb[] }> = ({ipAddress , countriesVotes })=>{
    const {countrySymbol , setCountrySymbol} = useCountrySymbolStore()
    const {setCountriesVotes} = useCountriesVotesStore()
     const {data , isLoading} = useQuery<{country : string }>({
        queryKey : [ipAddress]  , 
        queryFn : async  ()=>{ 
        const countrySymbol = localStorage.getItem(appConfig.countryLocalStorageKey)
        if(countrySymbol){ setCountrySymbol(countrySymbol) ; return {country : countrySymbol} }
        const info = await getIpAddressInfo(ipAddress)
        localStorage.setItem(appConfig.countryLocalStorageKey , info.country)
        setCountrySymbol(info.country)
        return info
    },
    })



    useEffect(()=>{
     setCountriesVotes(countriesVotes)
    } , [] )




    const countryName = countryLookUp.byInternet(data?.country || "" )?.country || ""
    return        <motion.div className="bg-white w-[900px] px-8 py-4 mt-6  flex items-center justify-between" >
    <div></div>
    <div className="flex gap-4 items-center  " ><img src="/flags/ad.png"  width="50px" />12202552<img src="/icons/dropDown.svg" className="w-[25px]" /></div>
   </motion.div>

}
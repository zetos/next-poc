import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { VehiclePerson } from '../../../models/api';
import axios from 'axios';
import { NextPageContext } from 'next';

export interface PersonProps {
  ownersList?: VehiclePerson[];
}

export default function Person({ ownersList }: PersonProps) {
  const router = useRouter();

 const [owners, setOwners] = useState(ownersList);
  useEffect(() => {
    async function loadData() {
      const response = await axios.get<VehiclePerson[]>('http://localhost:4001/vehicles?ownerName=' +
      router.query.person +
      '&vehicle=' +
      router.query.vehicle);
      const ownersList = response.data;
      setOwners(ownersList);
    }

    if(ownersList?.length == 0) {
        loadData();
    }
  }, []);

  if(!owners?.[0]) { 
      return <div>loading...</div>
  }

  return <pre>{owners[0]?.details}</pre>;
}

Person.getInitialProps = async ({query, req}: NextPageContext) => {
    if(!req) {
        return { ownersList: [] };
    }

  const response = await axios.get<VehiclePerson[]>(
    'http://localhost:4001/vehicles?ownerName=' +
      query.person +
      '&vehicle=' +
      query.vehicle
  );
  const ownersList = response.data;
  return { ownersList: ownersList };
};
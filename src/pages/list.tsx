import Link from 'next/link';
import axios from 'axios';
import { VehiclePerson } from '../../models/api';

export interface ListProps {
  ownersList: VehiclePerson[];
}

export default function List({ownersList}: ListProps) {
  
  return (
    <div>
      {ownersList.map((e, index) => (
        <div key={index}>
          <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {e.ownerName}'s {e.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

List.getInitialProps = async () => {
  const response = await axios.get<VehiclePerson[]>('http://localhost:4001/vehicles');
  const ownersList = response.data
  return {ownersList: ownersList}
}
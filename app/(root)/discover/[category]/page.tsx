import React from 'react'
import DiscoverScreen from '@/components/DiscoverScreen'
const page = ({ params }: { params: { category: string } }) => {
  return (
    <div className='' >
      <DiscoverScreen category = {params.category} />
    </div>
  );
};

export default page
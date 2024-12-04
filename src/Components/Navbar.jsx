import React, { useState, useEffect } from 'react';


function Navbar() {
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    setDay(weekday[date.getDay()]);
    let dd = String(date.getDate());
    let mm = String(date.getMonth() + 1); 
    let yy = String(date.getFullYear());
    setDate(dd + "/" + mm + "/" + yy);
  }, [day, setDay]);

  return (
    <div className='bg-[#F8F8F8] h-16 shadow-lg flex flex-col md:flex-row justify-between p-4'>
      
      <p className='text-4xl font-medium text-center md:text-left'>
        <span className='text-[#FF6767]'>Dash</span>
        <span>board</span>
      </p>

      
      <div className='text-center md:text-right mt-4 md:mt-0 hidden md:block'>
        <p className='text-[#FF6767] text-xl'>{day}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default Navbar;

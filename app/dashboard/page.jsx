import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-10 mg'>

      <h2 className='font-bold text-3xl text-primary'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your AI Mockup Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-5'>
        <AddNewInterview/>
      </div>

      {/* Previous Interview List  */}
      <InterviewList/>
      <div className="text-gray-400 absolute bottom-2 left-3 border-purple-500 border-2 ">Need a refresher? SMART DOCS COMING SOON...</div>
    </div>
  
  )
}

export default Dashboard
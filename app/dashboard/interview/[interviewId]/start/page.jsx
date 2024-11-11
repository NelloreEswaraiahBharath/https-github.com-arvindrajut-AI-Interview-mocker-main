"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch interview details on component mount
    GetInterviewDetails();
  }, []);

  /**
   * Used to Get Interview Details by MockId/Interview Id
   * Fetches the interview data from the database and sets the state.
   */
  const GetInterviewDetails = async () => {
    try {
      console.log('Fetching interview details...');
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));

      if (result.length === 0) {
        console.error('No interview data found for the given mock ID.');
        return;
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log('Fetched questions:', jsonMockResp);
      setMockInterviewQuestion(jsonMockResp.interviewQuestions); // Adjusted to access the correct array
      setInterviewData(result[0]);
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 text-white'>
        {/* Questions Section */}
        <QuestionsSection 
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Recording Section */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex > 0 && (
          <Button className="text-black" onClick={() => {
            console.log('Navigating to previous question...');
            setActiveQuestionIndex(activeQuestionIndex - 1);
          }}>Previous Question</Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button className="text-black" onClick={() => {
            console.log('Navigating to next question...');
            setActiveQuestionIndex(activeQuestionIndex + 1);
          }}>Next Question</Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
            <Button className="text-black" onClick={() => console.log('Ending interview...')}>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;

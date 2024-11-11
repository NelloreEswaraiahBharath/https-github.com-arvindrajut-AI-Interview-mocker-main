import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useEffect } from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    useEffect(() => {
        try {
            console.log('Component Rendered: QuestionsSection');
            console.log('Received mockInterviewQuestion:', mockInterviewQuestion);
            console.log('Active Question Index:', activeQuestionIndex);

            // Additional checks to see if the component is receiving anything
            if (!mockInterviewQuestion) {
                console.error('Error: mockInterviewQuestion is null or undefined.');
            } else if (!Array.isArray(mockInterviewQuestion)) {
                console.error('Error: mockInterviewQuestion is not an array:', mockInterviewQuestion);
            }
        } catch (error) {
            console.error('Error during useEffect:', error);
        }
    }, [mockInterviewQuestion, activeQuestionIndex]);

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, Your browser does not support text to speech');
        }
    };

    if (!mockInterviewQuestion || !Array.isArray(mockInterviewQuestion)) {
        return <div>No questions available</div>;
    }

    return (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion.map((question, index) => (
                    <h2
                        key={index}
                        className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${
                            activeQuestionIndex == index && 'bg-primary text-black'
                        }`}
                    >
                        Question #{index + 1}
                    </h2>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>
                {mockInterviewQuestion[activeQuestionIndex]?.question || 'No question found.'}
            </h2>
            <div className="flex justify-end">
            <Volume2
                className='cursor-pointer shadow-white'
                onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
            />
            <p>Tap to Listen</p>
            </div>

            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-black'>
                    <Lightbulb />
                    <strong>Note: Keep the answers precise</strong>
                </h2>
                <h2 className='text-sm text-primary my-2'>
                    {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                </h2>
            </div>
        </div>
    );
}

export default QuestionsSection;

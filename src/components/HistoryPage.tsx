import React, { useContext, FormEvent, useState, useEffect } from 'react'
import AuthContext from '../AuthContext'
import { Diagnosis } from '@/types';
import DiagnosisCard from './DiagnosisCard';

const HistoryPage = () => {
  const {jwt, setJwt} = useContext(AuthContext)!;
  const [diagnoses, setDiagnoses] = useState< Diagnosis[] | null>(null)

  useEffect(() => {                                   
    if (jwt) {
      getDiagnoses();
    }
  }, [jwt]);

  const getDiagnoses = async () => {
    const headers = { "Authorization": `Bearer ${jwt}` };
    try {
      const response = await fetch("http://localhost:8085/users/diagnoses", { 
        method: "GET", 
        headers 
      });
      const data = await response.json();
      setDiagnoses(data);
    } catch (error) {
      console.error('Error fetching history of user diagnoses:', error);
    }
  };

  if (!diagnoses || diagnoses.length === 0) {
    return <h1 className="text-center mt-10">No Skin Exams Performed Yet</h1>;
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Skin Exams History</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
        {diagnoses.map((diagnosis) => (
          <DiagnosisCard key={diagnosis.diagnosisId} diagnosis={diagnosis} />
        ))}
      </div>
    </main>
  );

}

export default HistoryPage
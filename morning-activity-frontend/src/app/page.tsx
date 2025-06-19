'use client'

import { useState } from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'

interface TestData {
  id: number
  name: string
  email: string
  created_at: string
}

export default function Home() {
  const { isSignedIn, user } = useUser()
  const [testData, setTestData] = useState<TestData[]>([])

  const fetchTestData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/test-data`)
      const data = await response.json()
      setTestData(data.data || [])
    } catch (error) {
      console.error('Error fetching test data:', error)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">朝活管理アプリ</h1>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                ログイン
              </button>
            </SignInButton>
          )}
        </div>
        
        {!isSignedIn ? (
          <div className="space-y-4">
            <h2 className="text-xl mb-4">ログインしてください</h2>
            <p className="text-gray-600">
              アプリを使用するにはログインが必要です。
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-100 p-4 rounded">
              <h2 className="text-xl">こんにちは、{user.firstName || user.emailAddresses[0].emailAddress}さん</h2>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={fetchTestData}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
              >
                テストデータを取得
              </button>
              
              {testData.length > 0 && (
                <div className="bg-gray-100 p-4 rounded">
                  <h3 className="font-bold mb-2">テストデータ:</h3>
                  <ul>
                    {testData.map((item: TestData) => (
                      <li key={item.id} className="mb-2">
                        {item.name} - {item.email}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
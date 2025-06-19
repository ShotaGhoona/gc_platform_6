'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface TestData {
  id: number
  name: string
  email: string
  created_at: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [testData, setTestData] = useState<TestData[]>([])

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) console.error('Error signing in:', error)
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
    setUser(null)
  }

  const fetchTestData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/test-data')
      const data = await response.json()
      setTestData(data.data || [])
    } catch (error) {
      console.error('Error fetching test data:', error)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">朝活管理アプリ</h1>
        
        {!user ? (
          <div className="space-y-4">
            <h2 className="text-xl mb-4">ログインしてください</h2>
            <button 
              onClick={signInWithGoogle}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Googleでログイン
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">こんにちは、{user.email}さん</h2>
              <button 
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                ログアウト
              </button>
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
import { User } from 'lucide-react'
import React from 'react'

export default function Conversation() {
  return (<>
    <div className='flex justify-between items-center px-1'>
      <div className='flex gap-2'>
        <div className='avatar avatar-online border rounded-full'>
           <User />
        </div>
        <p>John Doe</p>
      </div>
      <span>💀</span>
    </div>
    <div className='divider '></div>
    </>
  )
}

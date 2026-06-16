import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'
import ThemeToggle from '@/components/ui/ThemeToggle'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = async ({children}: Props) => {

const supabase = await createClient()
const {data:{user}} = await supabase.auth.getUser()

  if(!user){
    redirect("/login")

  }


return (
  <div className=' w-full min-h-screen bg-bg py-2 flex flex-col'>
    <nav className=' text-text-primary w-full bg-surface border-b border-border px-4'>
      <div className=' py-4 flex  max-w-7xl mx-auto flex-row justify-between items-center'>

    JobTracker
    <ThemeToggle />
      </div>
    </nav>
    <main className=' flex-1 max-w-5xl mx-auto  flex flex-col justify-center items-center p-4'>
{children}
    </main>
  </div>
)
}

export default DashboardLayout
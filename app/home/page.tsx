import { redirect } from 'next/navigation'

// Redirect /home to the root path
export default function HomeRedirect() {
  redirect('/')
}

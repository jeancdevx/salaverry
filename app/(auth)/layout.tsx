import LightRays from '@/components/light-rays'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='mx-auto flex min-h-svh max-w-7xl flex-col items-center justify-center gap-y-6 px-4 py-4 md:px-8 md:py-8'>
      <div className='absolute -z-10 min-h-svh w-full overflow-hidden'>
        <LightRays
          raysOrigin='top-center'
          raysColor='#00ffff'
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className='custom-rays'
        />
      </div>

      {children}
    </div>
  )
}

import clsx from 'clsx'

export default function LateShowLabel({
  rounded = true,
  className = 'bg-[#6372e5]',
}: {
  rounded?: boolean
  className?: string
}) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(rounded && 'rounded-md', className)}
    >
      <title>late show</title>
      <rect width="17" height="17" rx="3" fill="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.0016 10.4796C14.0011 10.4796 14.0005 10.4796 14 10.4796C10.8409 10.4796 8.28 7.91864 8.28 4.75957C8.28 3.97998 8.43596 3.23681 8.71838 2.55957C5.56006 2.56044 3 5.12104 3 8.27957C3 11.4386 5.56093 13.9996 8.72 13.9996C11.0995 13.9996 13.1396 12.5466 14.0016 10.4796Z"
        fill="black"
      />
    </svg>
  )
}

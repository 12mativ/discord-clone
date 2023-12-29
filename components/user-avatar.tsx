import {Avatar, AvatarImage} from '@/components/ui/avatar'
import {cn} from "@/lib/utils";

interface UserAvatar {
  src?: string
  className?: string
}

function UserAvatar({src, className}: UserAvatar) {
  return (
    <Avatar className={cn(
      'h-7 w-7 md:h-10 md:w-10',
      className!
    )}>
      <AvatarImage src={src} />
    </Avatar>
  )
}

export default UserAvatar
import {currentProfile} from "@/lib/current-profile";

import {redirectToSignIn} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";

interface InviteCodePageProps {
  params: {
    inviteCode: string
  }
}

export default async function InviteCodePage({params}: InviteCodePageProps) {
  const profile = await currentProfile()
  debugger
  if (!profile) {
    return redirectToSignIn()
  }

  if (!params.inviteCode) {
    debugger
    return redirect('/')
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (existingServer) {
    debugger
    return redirect(`/servers/${existingServer.id}`)
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          }
        ]
      }
    }
  })

  if (server) {
    debugger
    return redirect(`/servers/${server.id}`)
  }

  return (
    <div>
      hh
    </div>
  )
}
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function Settings() {
  return (
    <main className='p-12 gap-4 flex flex-col'>
        <h1 className='text-4xl'>Settings</h1>
        <section className='flex flex-row flex-1 justify-between gap-4'>
                <Card className='p-6 bg-background basis-1/2'>
                    <CardTitle className='flex flex-col gap-2'>
                        <h2 className='text-2xl'>Account Settings</h2>
                        <p className='font-light'>Manage your account settings here.</p>
                    </CardTitle>
                    <CardDescription>
                        <form className='flex flex-col gap-4'>
                            <div>
                                <Label htmlFor="username" className="mb-2">
                                    Change Username
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Change username here. Leave blank to keep current username."
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">
                                    Change Email
                                </Label>
                                <Input
                                    type="email"
                                    placeholder="Change email here. Leave blank to keep current email."
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="mb-2">
                                    Change Password
                                </Label>
                                <Input
                                    type="password"
                                    placeholder="Change password here. Leave blank to keep current password."
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit" className="mt-4">
                                Save Changes
                            </Button>
                        </form>
                    </CardDescription>
                </Card>
                <Card className='p-6 bg-background basis-1/2'>
                    <CardTitle className='flex flex-col gap-2'>
                        <h2 className='text-2xl'>Privacy Settings</h2>
                        <p className='font-light'>Manage your account settings here.</p>
                    </CardTitle>
                    <CardDescription>
                        <form className='flex flex-col gap-4'>
                            <div>
                                <Label htmlFor="username" className="mb-2">
                                    Change Username
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Change username here. Leave blank to keep current username."
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2">
                                    Change Email
                                </Label>
                                <Input
                                    type="email"
                                    placeholder="Change email here. Leave blank to keep current email."
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="mb-2">
                                    Change Password
                                </Label>
                                <Input
                                    type="password"
                                    placeholder="Change password here. Leave blank to keep current password."
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit" className="mt-4">
                                Save Changes
                            </Button>
                        </form>
                    </CardDescription>
                </Card>
            


        </section>
    </main>
  )
}

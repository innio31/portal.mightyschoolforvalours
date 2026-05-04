'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { User, logout } from '@/lib/auth'

interface TopbarProps {
    onMenuClick: () => void
    user: User
}

export default function Topbar({ onMenuClick, user }: TopbarProps) {
    return (
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>

                <div className="flex items-center gap-4 ml-auto">
                    {/* Notifications */}
                    <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
                        <BellIcon className="h-5 w-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Menu */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                            <UserCircleIcon className="h-8 w-8 text-navy" />
                            <span className="hidden md:block text-sm font-medium text-gray-700">
                                {user.first_name} {user.last_name}
                            </span>
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="/profile"
                                            className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Your Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => logout()}
                                            className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Sign Out
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </header>
    )
}
"use client";

import {
    LogOutIcon,
    UserIcon,
    Monitor,
    Moon,
    Sun,
    ChevronDown
} from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import { NavMenuProps } from '@/types';
import { memo } from 'react';

const NavMenu = ({ user, onSignOut }: NavMenuProps) => {
    const { setTheme, theme } = useTheme();

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-1 hover:bg-transparent gap-1">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profile || "/placeholder.svg"} alt="Profile image" />
                        <AvatarFallback className="text-xs">{user.name?.charAt(0) || ""}</AvatarFallback>
                    </Avatar>
                    <ChevronDown aria-hidden className='text-muted-foreground' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                        {user.name}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                            <Monitor size={16} className="opacity-60" aria-hidden="true" />
                            <span className='ml-2'>Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                                <Sun size={16} className="opacity-60" aria-hidden="true" />
                                <span>Light</span>
                                {theme === "light" && <div className="ml-auto h-2 w-2 rounded-full bg-foreground" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                                <Moon size={16} className="opacity-60" aria-hidden="true" />
                                <span>Dark</span>
                                {theme === "dark" && <div className="ml-auto h-2 w-2 rounded-full bg-foreground" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                                <Monitor size={16} className="opacity-60" aria-hidden="true" />
                                <span>System</span>
                                {theme === "system" && <div className="ml-auto h-2 w-2 rounded-full bg-foreground" />}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                            <UserIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default memo(NavMenu);
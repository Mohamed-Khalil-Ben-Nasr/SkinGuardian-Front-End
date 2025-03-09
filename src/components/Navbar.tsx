import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center bg-white shadow">
      <NavigationMenu className="bg-white shadow p-4">
        <div className="container mx-auto">
          <NavigationMenuList className="flex justify-center items-center space-x-8">
            <NavigationMenuItem>
              <Link to="/profile">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-xl font-semibold`}
                >
                  Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/newDiagnosis">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-xl font-semibold`}
                >
                  New Diagnosis
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/history">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-xl font-semibold`}
                >
                  History
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </nav>
    
  );
};

export default Navbar;

import { Home, Upload, MessageSquareText, Info, GraduationCap, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Upload Materials", url: "/upload", icon: Upload },
  { title: "AI Chat", url: "/chat", icon: MessageSquareText },
  { title: "About", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sidebar-accent flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-sidebar-foreground" />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold text-sidebar-foreground leading-tight">
                AI College
              </h2>
              <p className="text-xs text-sidebar-foreground/70">Knowledge Assistant</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <GraduationCap className="h-5 w-5 text-sidebar-foreground" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-4">
          <div className="rounded-xl bg-sidebar-accent/30 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-sidebar-foreground/80" />
              <span className="text-xs font-medium text-sidebar-foreground/90">RAG Powered</span>
            </div>
            <p className="text-xs text-sidebar-foreground/60 leading-relaxed">
              Answers are generated from your uploaded study materials.
            </p>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

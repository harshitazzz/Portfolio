import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Image, User, Briefcase, GraduationCap, Award, Link, Phone, MessageSquare } from 'lucide-react';
import './AdminLayout.css';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { path: '/admin/hero', label: 'Hero', icon: <Image size={18} /> },
  { path: '/admin/about', label: 'About', icon: <User size={18} /> },
  { path: '/admin/projects', label: 'Projects', icon: <Briefcase size={18} /> },
  { path: '/admin/achievements', label: 'Achievements', icon: <Award size={18} /> },
  { path: '/admin/education', label: 'Education', icon: <GraduationCap size={18} /> },
  { path: '/admin/experience', label: 'Experience', icon: <Briefcase size={18} /> },
  { path: '/admin/social', label: 'Social Links', icon: <Link size={18} /> },
  { path: '/admin/contact', label: 'Contact', icon: <Phone size={18} /> },
  { path: '/admin/messages', label: 'Messages', icon: <MessageSquare size={18} /> },
];

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin CMS</h2>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import Menu from './components/Menu'  // ← Make sure this path is correct
import Contact from './contact/Contact.jsx'
import Qualifications from './qualification/Qualifications.jsx'
import AddQualification from './qualification/AddQualification.jsx'
import EditQualification from './qualification/EditQualification.jsx'
import Projects from './project/Projects.jsx'
import AddProject from './project/AddProject.jsx'
import EditProject from './project/EditProject.jsx'

function MainRouter() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route 
          path="/user/edit/:userId" 
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          } 
        />
        <Route path="/user/:userId" element={<Profile />} />
        
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/qualifications" element={<Qualifications />} />
        <Route 
          path="/qualification/new" 
          element={
            <PrivateRoute>
              <AddQualification />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/qualification/edit/:qualificationId" 
          element={
            <PrivateRoute>
              <EditQualification />
            </PrivateRoute>
          } 
        />
        
        <Route path="/projects" element={<Projects />} />
        <Route 
          path="/project/new" 
          element={
            <PrivateRoute>
              <AddProject />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/project/edit/:projectId" 
          element={
            <PrivateRoute>
              <EditProject />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default MainRouter
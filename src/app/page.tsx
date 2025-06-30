'use client'

import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Rating,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
  LinearProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem,
  InputAdornment,
  Autocomplete,
  AlertColor,
} from '@mui/material'
import {
  Person,
  Email,
  Phone,
  Favorite,
  FavoriteBorder,
  ExpandMore,
  MoreVert,
  Add,
  Delete,
  Edit,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Warning,
} from '@mui/icons-material'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  isFavorite: boolean
}

interface Alert {
  key: string
  open: boolean
  severity: AlertColor
  message: string
}

interface SnackbarState {
  open: boolean
  message: string
  severity: AlertColor
}

export default function Home() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 'female',
    notifications: false,
    terms: false,
    rating: 0,
    sliderValue: 50,
    showPassword: false,
    skills: [] as string[],
  })

  // Projects state
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Task Manager App',
      description: 'A simple but effective task management tool I built to keep track of daily activities.',
      technologies: ['React', 'TypeScript', 'MUI'],
      isFavorite: true,
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'My personal portfolio showcasing projects and skills. Clean and responsive design.',
      technologies: ['Next.js', 'Tailwind', 'Framer Motion'],
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather app with location tracking and 7-day forecasts.',
      technologies: ['React Native', 'Expo', 'OpenWeather API'],
      isFavorite: false,
    },
  ])

  // UI state
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  })

  // Alert state for Messages & Alerts
  const [alerts] = useState<Alert[]>([
    { key: 'info', open: true, severity: 'info', message: 'Hey there! Welcome to our component showcase.' },
    { key: 'success', open: true, severity: 'success', message: 'Nice! Your profile has been updated.' },
    { key: 'warning', open: true, severity: 'warning', message: 'Just a heads up - double-check your info before saving.' },
    { key: 'error', open: true, severity: 'error', message: 'Oops! Something went sideways. Give it another shot.' }
  ])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [tabValue, setTabValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Autocomplete options
  const skillOptions = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby'
  ]

  // Event handlers
  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleCheckboxChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSnackbar({
      open: true,
      message: 'Profile saved! Your info has been updated.',
      severity: 'success'
    })
  }

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  // Project handlers
  const handleDeleteProject = (project: Project) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    setEditDialogOpen(true)
  }

  const handleViewProject = (project: Project) => {
    setSnackbar({
      open: true,
      message: `Opening ${project.title}...`,
      severity: 'info'
    })
  }

  const handleToggleFavorite = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, isFavorite: !project.isFavorite }
        : project
    ))
    setSnackbar({
      open: true,
      message: 'Project added to favorites!',
      severity: 'success'
    })
  }

  const confirmDelete = () => {
    if (selectedProject) {
      setProjects(prev => prev.filter(p => p.id !== selectedProject.id))
      setSnackbar({
        open: true,
        message: `"${selectedProject.title}" has been deleted.`,
        severity: 'success'
      })
    }
    setDeleteDialogOpen(false)
    setSelectedProject(null)
  }

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedProject) {
      setProjects(prev => prev.map(p => 
        p.id === selectedProject.id 
          ? { ...p, title: 'Updated Project', description: 'Updated description' }
          : p
      ))
      setSnackbar({
        open: true,
        message: 'Project updated successfully!',
        severity: 'success'
      })
    }
    setEditDialogOpen(false)
    setSelectedProject(null)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Component Playground
      </Typography>
      
      <Typography variant="h6" gutterBottom align="center" color="text.secondary" sx={{ mb: 2 }}>
        A hands-on exploration of Material-UI components
      </Typography>

      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Built following CodeWithNazim&apos;s DeAura guidelines - Learning Material-UI through practice
      </Typography>

      <Stack spacing={4}>
        {/* Form Components Section */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Paper elevation={3} sx={{ p: 3, flex: 1, minWidth: 300 }}>
            <Typography variant="h5" gutterBottom color="primary">
              User Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Stack spacing={3}>
                {/* Text Fields */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ flex: 1, minWidth: 200 }}
                  />
                  <TextField
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    sx={{ flex: 1, minWidth: 200 }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                          edge="end"
                        >
                          {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Autocomplete */}
                <Autocomplete
                  multiple
                  options={skillOptions}
                  value={formData.skills}
                  onChange={(_, newValue) => setFormData(prev => ({ ...prev, skills: newValue }))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      placeholder="Select your skills"
                    />
                  )}
                  renderTags={(value) =>
                    value.map((option, index) => (
                      <Chip
                        key={`${option}-${index}`}
                        label={option}
                        onDelete={() => {
                          const newSkills = formData.skills.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, skills: newSkills }))
                        }}
                        color="primary"
                        variant="outlined"
                      />
                    ))
                  }
                />

                {/* Radio Buttons */}
                <FormControl component="fieldset">
                  <FormLabel component="legend">How do you identify?</FormLabel>
                  <RadioGroup
                    row
                    value={formData.gender}
                    onChange={handleInputChange('gender')}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Woman" />
                    <FormControlLabel value="male" control={<Radio />} label="Man" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>

                {/* Checkboxes */}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.notifications}
                        onChange={handleCheckboxChange('notifications')}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />
                    }
                    label="Send me cool updates"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.terms}
                        onChange={handleCheckboxChange('terms')}
                      />
                    }
                    label="I'm cool with the terms"
                  />
                </FormGroup>

                {/* Switch */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notifications}
                      onChange={handleCheckboxChange('notifications')}
                    />
                  }
                  label="Dark mode vibes"
                />

                {/* Slider */}
                <Box>
                  <Typography gutterBottom>How experienced are you?</Typography>
                  <Slider
                    value={formData.sliderValue}
                    onChange={(_, value) => setFormData(prev => ({ ...prev, sliderValue: value as number }))}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: 'Just starting' },
                      { value: 50, label: 'Getting there' },
                      { value: 100, label: 'Pro level' },
                    ]}
                  />
                </Box>

                {/* Rating */}
                <Box>
                  <Typography component="legend">How&apos;s this looking?</Typography>
                  <Rating
                    value={formData.rating}
                    onChange={(_, value) => setFormData(prev => ({ ...prev, rating: value || 0 }))}
                    precision={0.5}
                  />
                </Box>

                {/* Buttons */}
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<CheckCircle />}
                  >
                    Save Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Edit />}
                    onClick={() => setSnackbar({
                      open: true,
                      message: 'Edit mode activated!',
                      severity: 'info'
                    })}
                  >
                    Tweak It
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => setSnackbar({
                      open: true,
                      message: 'Profile cleared!',
                      severity: 'warning'
                    })}
                  >
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Paper>

          {/* Layout Components Section */}
          <Paper elevation={3} sx={{ p: 3, flex: 1, minWidth: 300 }}>
            <Typography variant="h5" gutterBottom color="primary">
              🎨 Layout & Navigation
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                <Tab label="Profile" />
                <Tab label="Settings" />
                <Tab label="Help" />
              </Tabs>
            </Box>

            {/* Tab Content */}
            <Box sx={{ mb: 3 }}>
              {tabValue === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>My Profile</Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Kamel Ben rhouma"
                        secondary="Frontend Developer"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText
                        primary="kamel.consulting@proton.me"
                        secondary="Work email"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText
                        primary="+216 52 847 392"
                        secondary="Mobile"
                      />
                    </ListItem>
                  </List>
                </Box>
              )}
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>App Settings</Typography>
                  <FormGroup>
                    <FormControlLabel control={<Switch />} label="Push notifications" />
                    <FormControlLabel control={<Switch />} label="Dark mode" />
                    <FormControlLabel control={<Switch />} label="Auto sync" />
                  </FormGroup>
                </Box>
              )}
              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Need Help?</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check our docs or reach out to support if you need assistance.
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Accordion */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>How does this work?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  This demo shows how Material-UI components work together in a real app.
                  Try clicking around to see the interactions.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Customizing the theme</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can change colors, fonts, and styles by editing the theme file.
                  It&apos;s pretty straightforward once you get the hang of it.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>

        {/* Data Display Section */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom color="primary">
            🃏 Cards & Data
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
            {/* Cards */}
            {projects.map((project) => (
              <Card key={project.id} sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {project.technologies.map((tech, index) => (
                      <Chip key={tech + '-' + index} label={tech} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<Edit />}
                    onClick={() => handleViewProject(project)}
                  >
                    View
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<Edit />}
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </Button>
                  <IconButton 
                    size="small" 
                    color={project.isFavorite ? "error" : "default"}
                    onClick={() => handleToggleFavorite(project.id)}
                  >
                    <Favorite />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDeleteProject(project)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>

          {/* Grid Example */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Layout Example with Stack
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Paper sx={{ p: 2, textAlign: 'center', flex: 1, minWidth: 200 }}>
                <Typography variant="h6">Column 1</Typography>
                <Typography variant="body2">Responsive layout item</Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center', flex: 1, minWidth: 200 }}>
                <Typography variant="h6">Column 2</Typography>
                <Typography variant="body2">Adapts to screen size</Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center', flex: 1, minWidth: 200 }}>
                <Typography variant="h6">Column 3</Typography>
                <Typography variant="body2">Flexible layout</Typography>
              </Paper>
            </Stack>
          </Box>

          {/* Progress and Badges */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Progress & Status
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography gutterBottom>Current Progress</Typography>
                <LinearProgress variant="determinate" value={75} sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  3 of 4 tasks done
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Badge badgeContent={4} color="primary">
                  <Avatar>
                    <Person />
                  </Avatar>
                </Badge>
                <Badge badgeContent={12} color="secondary">
                  <Avatar>
                    <Email />
                  </Avatar>
                </Badge>
                <Badge badgeContent={0} color="error">
                  <Avatar>
                    <Warning />
                  </Avatar>
                </Badge>
              </Stack>
            </Box>
          </Box>

          {/* Alerts */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Messages & Alerts
            </Typography>
            <Stack spacing={2}>
              {alerts.map((alert) => (
                <Alert
                  key={alert.key}
                  severity={alert.severity}
                >
                  {alert.message}
                </Alert>
              ))}
            </Stack>
          </Box>

          {/* Action Buttons */}
          <Box>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button
                variant="contained"
                onClick={() => setDialogOpen(true)}
                startIcon={<Add />}
              >
                Add New
              </Button>
              <Button
                variant="outlined"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                endIcon={<MoreVert />}
              >
                More Options
              </Button>
              <Button
                variant="text"
                onClick={() => setSnackbar({
                  open: true,
                  message: 'Here\'s your message!',
                  severity: 'success'
                })}
              >
                Show Message
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Stack>

      {/* Main Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to proceed with this action?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setDialogOpen(false)} variant="contained">
            Yes, proceed
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{selectedProject?.title}&quot;? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleEditSubmit} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Project Name"
                defaultValue={selectedProject?.title}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                defaultValue={selectedProject?.description}
              />
              <TextField
                fullWidth
                label="Technologies (comma separated)"
                defaultValue={selectedProject?.technologies.join(', ')}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

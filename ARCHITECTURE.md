# AI Storyboard & Moodboard Generator - Architecture

## Project Structure

This project follows **Atomic Design** principles for component organization, making it ideal for Git branch-based development where features can be developed independently.

### Directory Structure

```
src/app/
├── components/
│   ├── storyboard/
│   │   ├── atoms/              # Basic building blocks
│   │   │   ├── IconButton.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── molecules/          # Composite components
│   │   │   ├── StoryboardCard.tsx
│   │   │   └── SettingControl.tsx
│   │   ├── organisms/          # Complex components
│   │   │   ├── Toolbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── StoryboardGrid.tsx
│   │   └── modals/             # Modal dialogs
│   │       └── EditPromptModal.tsx
│   └── ui/                     # Shared UI components (shadcn/ui)
├── data/
│   └── mockData.ts             # Mock data for development
├── types/
│   └── storyboard.ts           # TypeScript interfaces
└── App.tsx                     # Main application component
```

## Atomic Design Layers

### 1. Atoms (`atoms/`)
Independent, reusable components with no dependencies on other custom components.
- `IconButton.tsx` - Configurable icon button with variants
- `StatusBadge.tsx` - Status indicator with animations

**Git Strategy**: Can be developed in isolation. Safe to merge independently.

### 2. Molecules (`molecules/`)
Combinations of atoms that form functional units.
- `StoryboardCard.tsx` - Card displaying a single storyboard frame
- `SettingControl.tsx` - Settings dropdown with label and icon

**Git Strategy**: Depends only on atoms. Can be feature-branched separately.

### 3. Organisms (`organisms/`)
Complex components that combine molecules and atoms.
- `Toolbar.tsx` - Top navigation bar with actions
- `Sidebar.tsx` - Configuration panel
- `StoryboardGrid.tsx` - Main grid layout for frames

**Git Strategy**: Major features. Each organism can be a separate feature branch.

### 4. Modals (`modals/`)
Overlay components for specific interactions.
- `EditPromptModal.tsx` - Modal for editing frame prompts

**Git Strategy**: Isolated features. Easy to develop and test independently.

## Feature Branch Strategy

### Recommended Branch Naming

```
feature/atoms-icon-button
feature/molecules-storyboard-card
feature/organisms-toolbar
feature/modals-edit-prompt
feature/data-mock-setup
feature/types-interfaces
```

### Independent Development Areas

1. **Sidebar Settings** (`organisms/Sidebar.tsx` + `molecules/SettingControl.tsx`)
2. **Grid Display** (`organisms/StoryboardGrid.tsx` + `molecules/StoryboardCard.tsx`)
3. **Toolbar Actions** (`organisms/Toolbar.tsx`)
4. **Modal System** (`modals/EditPromptModal.tsx`)
5. **Shared Atoms** (`atoms/*`)

## Component Dependencies

```
App.tsx
├── Toolbar (organism)
│   └── IconButton (atom)
├── Sidebar (organism)
│   └── SettingControl (molecule)
├── StoryboardGrid (organism)
│   ├── StoryboardCard (molecule)
│   │   ├── IconButton (atom)
│   │   └── StatusBadge (atom)
│   └── IconButton (atom)
└── EditPromptModal (modal)
```

## Styling Approach

- **Tailwind CSS v4** for all styling
- **Gradient theme**: Violet/Indigo accents on dark slate background
- **No external CSS files** for components (everything inline)
- **Responsive**: Mobile-first with breakpoints at `md:` and `lg:`

## State Management

- **React useState** for local state
- **Props drilling** for communication (simple hierarchy)
- Future enhancement: Context API or Zustand for global state

## Type Safety

All components are fully typed with TypeScript interfaces defined in `types/storyboard.ts`:
- `StoryboardFrame` - Individual frame data
- `StoryboardProject` - Project with multiple frames
- `GenerationSettings` - AI generation configuration

## Mock Data

Located in `data/mockData.ts` with sample frames using Unsplash images for realistic previews.

## Development Workflow

1. **Start development server** (already running in Figma Make)
2. **Create feature branch** for your component
3. **Develop in isolation** using the atomic structure
4. **Test with mock data** from `data/mockData.ts`
5. **Merge without conflicts** due to modular separation

## Visual Design System

### Colors
- **Background**: slate-950, slate-900, slate-800
- **Text**: slate-100, slate-300, slate-400
- **Accents**: violet-600, indigo-600
- **Status**: blue (generating), emerald (completed), red (error)

### Typography
- Default theme settings from `src/styles/theme.css`
- No custom font size classes unless specified

### Spacing
- Consistent padding: p-4, p-6, p-8
- Gap spacing: gap-2, gap-3, gap-4, gap-6

### Interactions
- Hover states on all interactive elements
- Smooth transitions (duration-200, duration-300)
- Scale transforms on cards (hover:scale-105)
- Backdrop blur on modals

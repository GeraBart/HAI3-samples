/**
 * Overview Screen
 * Dashboard overview with empty state for the newTest screenset
 * Based on Figma: Ai dashboards - widgets (node 1167-16585)
 */

import React, { useState, useEffect } from 'react';
import {
  useTranslation,
  TextLoader,
  useScreenTranslations,
  I18nRegistry,
  Language,
} from '@hai3/uicore';
import { setMenuVisibility } from '../../actions/newTestActions';
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Input,
} from '@hai3/uikit';
import {
  Plus,
  Download,
  Send,
  Maximize2,
  MoreHorizontal,
  Gauge,
  Pencil,
  Trash2,
} from 'lucide-react';
import { NEW_TEST_SCREENSET_ID, OVERVIEW_SCREEN_ID } from '../../ids';
import { DashboardWidgetsGrid, AddWidgetPanel, CustomWidgetConfig } from './components/DashboardWidgets';
import { SidebarSections, SectionItem } from './components/SidebarSections';

// NOTE: Analytics section temporarily disabled - cross-screenset imports violate architecture rules
// To enable Analytics, create a local implementation or use a shared component approach

/**
 * Screen-level translations (loaded lazily when screen mounts)
 */
const translations = I18nRegistry.createLoader({
  [Language.English]: () => import('./i18n/en.json'),
  [Language.Arabic]: () => import('./i18n/ar.json'),
  [Language.Bengali]: () => import('./i18n/bn.json'),
  [Language.Czech]: () => import('./i18n/cs.json'),
  [Language.Danish]: () => import('./i18n/da.json'),
  [Language.German]: () => import('./i18n/de.json'),
  [Language.Greek]: () => import('./i18n/el.json'),
  [Language.Spanish]: () => import('./i18n/es.json'),
  [Language.Persian]: () => import('./i18n/fa.json'),
  [Language.Finnish]: () => import('./i18n/fi.json'),
  [Language.French]: () => import('./i18n/fr.json'),
  [Language.Hebrew]: () => import('./i18n/he.json'),
  [Language.Hindi]: () => import('./i18n/hi.json'),
  [Language.Hungarian]: () => import('./i18n/hu.json'),
  [Language.Indonesian]: () => import('./i18n/id.json'),
  [Language.Italian]: () => import('./i18n/it.json'),
  [Language.Japanese]: () => import('./i18n/ja.json'),
  [Language.Korean]: () => import('./i18n/ko.json'),
  [Language.Malay]: () => import('./i18n/ms.json'),
  [Language.Dutch]: () => import('./i18n/nl.json'),
  [Language.Norwegian]: () => import('./i18n/no.json'),
  [Language.Polish]: () => import('./i18n/pl.json'),
  [Language.Portuguese]: () => import('./i18n/pt.json'),
  [Language.Romanian]: () => import('./i18n/ro.json'),
  [Language.Russian]: () => import('./i18n/ru.json'),
  [Language.Swedish]: () => import('./i18n/sv.json'),
  [Language.Swahili]: () => import('./i18n/sw.json'),
  [Language.Tamil]: () => import('./i18n/ta.json'),
  [Language.Thai]: () => import('./i18n/th.json'),
  [Language.Tagalog]: () => import('./i18n/tl.json'),
  [Language.Turkish]: () => import('./i18n/tr.json'),
  [Language.Ukrainian]: () => import('./i18n/uk.json'),
  [Language.Urdu]: () => import('./i18n/ur.json'),
  [Language.Vietnamese]: () => import('./i18n/vi.json'),
  [Language.ChineseSimplified]: () => import('./i18n/zh.json'),
  [Language.ChineseTraditional]: () => import('./i18n/zh-TW.json'),
});

/**
 * Translation key helper
 */
const tk = (key: string) => `screen.${NEW_TEST_SCREENSET_ID}.${OVERVIEW_SCREEN_ID}:${key}`;

/**
 * Tab interface for dashboard tabs
 */
interface Tab {
  id: string;
  name: string;
  hasWidgets: boolean; // true = show widgets grid, false = show empty state
}

/**
 * Overview Screen Component
 * Displays dashboard with tabs, header actions, and empty state
 */
export const OverviewScreen: React.FC = () => {
  // Register translations for this screen
  useScreenTranslations(NEW_TEST_SCREENSET_ID, OVERVIEW_SCREEN_ID, translations);

  const { t } = useTranslation();

  // Hide the framework menu/sidebar - we use our own custom sidebar
  useEffect(() => {
    setMenuVisibility(false);
    
    // Find and hide the framework sidebar element directly
    const hideSidebar = () => {
      // The framework sidebar is typically an aside element with specific classes
      const sidebars = document.querySelectorAll('aside');
      sidebars.forEach(sidebar => {
        // Check if this is the framework sidebar (not our custom one)
        if (sidebar.classList.contains('bg-sidebar') && !sidebar.closest('[data-custom-sidebar]')) {
          (sidebar as HTMLElement).style.display = 'none';
        }
      });
    };
    
    // Run immediately and also after a short delay for dynamic content
    hideSidebar();
    const timer = setTimeout(hideSidebar, 100);
    
    // Restore menu visibility when component unmounts
    return () => {
      clearTimeout(timer);
      setMenuVisibility(true);
      const sidebars = document.querySelectorAll('aside');
      sidebars.forEach(sidebar => {
        (sidebar as HTMLElement).style.display = '';
      });
    };
  }, []);

  // Tab state management - use hardcoded default name, will be translated in render
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'dashboard', name: 'Dashboard', hasWidgets: false },
  ]);
  const [activeTabId, setActiveTabId] = useState('dashboard');
  const [newTabName, setNewTabName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  // Track widgets per tab - key is tab ID, value is array of widgets
  const [widgetsByTab, setWidgetsByTab] = useState<Record<string, CustomWidgetConfig[]>>({});
  const [isTabsDropdownOpen, setIsTabsDropdownOpen] = useState(false);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState('');

  // Sidebar sections state - MONITORING child sections
  // System sections (overview, analytics) cannot be moved, edited, or deleted
  const [sections, setSections] = useState<SectionItem[]>([
    { id: 'overview', name: 'Overview', isSystem: true },
    { id: 'analytics', name: 'Analytics', isSystem: true },
  ]);
  const [activeSectionId, setActiveSectionId] = useState('overview');

  // Handle adding a new section
  const handleAddSection = (name: string) => {
    const newSection: SectionItem = {
      id: `section-${Date.now()}`,
      name,
    };
    setSections([...sections, newSection]);
  };

  // Handle renaming a section
  const handleRenameSection = (sectionId: string, newName: string) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, name: newName } : section
    ));
  };

  // Handle deleting a section
  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
    if (activeSectionId === sectionId) {
      setActiveSectionId('overview');
    }
  };

  // Handle moving a section up or down
  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    
    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
  };

  // Handle deleting a tab
  const handleDeleteTab = (tabId: string) => {
    // Don't allow deleting the default dashboard tab
    if (tabId === 'dashboard') return;
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    // If the deleted tab was active, switch to dashboard
    if (activeTabId === tabId) {
      setActiveTabId('dashboard');
    }
    setIsTabsDropdownOpen(false);
  };

  // Handle starting to edit a tab - opens modal
  const handleStartEditTab = (tabId: string, currentName: string) => {
    setEditingTabId(tabId);
    setEditingTabName(currentName);
    setIsTabsDropdownOpen(false); // Close dropdown when opening edit modal
  };

  // Handle saving tab edit
  const handleSaveTabEdit = () => {
    if (editingTabId && editingTabName.trim()) {
      setTabs(tabs.map(tab => 
        tab.id === editingTabId 
          ? { ...tab, name: editingTabName.trim() }
          : tab
      ));
      setEditingTabId(null);
      setEditingTabName('');
    }
  };

  // Handle canceling tab edit
  const handleCancelTabEdit = () => {
    setEditingTabId(null);
    setEditingTabName('');
  };

  // Handle adding a new custom widget to the current tab
  const handleAddWidget = (config: { 
    name: string; 
    description: string; 
    type: string;
    datasource?: string;
    labelField?: string;
    valueField?: string;
    sortField?: string;
    sortOrder?: string;
    colourScheme?: string;
    showSummary?: boolean;
    showLegend?: boolean;
    // Bar chart specific
    groupField?: string;
    barThickness?: number;
    stacked?: boolean;
    // Table specific
    columns?: { id: string; field: string; label: string; sortable: boolean; hidden: boolean }[];
    gridAlignment?: 'left' | 'center' | 'right';
    stripedGrid?: boolean;
  }) => {
    const newWidget: CustomWidgetConfig = {
      id: `custom-widget-${Date.now()}`,
      name: config.name,
      description: config.description,
      type: config.type,
      datasource: config.datasource,
      labelField: config.labelField,
      valueField: config.valueField,
      sortField: config.sortField,
      sortOrder: config.sortOrder,
      colourScheme: config.colourScheme,
      showSummary: config.showSummary,
      showLegend: config.showLegend,
      // Bar chart specific
      groupField: config.groupField,
      barThickness: config.barThickness,
      stacked: config.stacked,
      // Table specific
      columns: config.columns,
      gridAlignment: config.gridAlignment,
      stripedGrid: config.stripedGrid,
    };
    // Add widget to current tab
    setWidgetsByTab(prev => ({
      ...prev,
      [activeTabId]: [...(prev[activeTabId] || []), newWidget],
    }));
    setIsAddWidgetOpen(false);
  };

  // Handle removing a custom widget from the current tab
  const handleRemoveCustomWidget = (widgetId: string) => {
    setWidgetsByTab(prev => ({
      ...prev,
      [activeTabId]: (prev[activeTabId] || []).filter(w => w.id !== widgetId),
    }));
  };
  
  // Get widgets for current tab
  const currentTabWidgets = widgetsByTab[activeTabId] || [];

  // Handle adding a new tab
  const handleAddTab = () => {
    if (newTabName.trim()) {
      const newTab: Tab = {
        id: `tab-${Date.now()}`,
        name: newTabName.trim(),
        hasWidgets: true, // New tabs show the predefined widgets
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
      setNewTabName('');
      setIsDialogOpen(false);
    }
  };

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar Sections */}
      <SidebarSections
        sections={sections}
        activeSectionId={activeSectionId}
        onSectionClick={setActiveSectionId}
        onAddSection={handleAddSection}
        onRenameSection={handleRenameSection}
        onDeleteSection={handleDeleteSection}
        onMoveSection={handleMoveSection}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* NOTE: Analytics section temporarily shows placeholder - cross-screenset imports were removed */}
        {activeSectionId === 'analytics' ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">Analytics</p>
              <p className="text-sm">Coming soon - implementation pending</p>
            </div>
          </div>
        ) : (
        <>
        {/* Dashboard Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        {/* Tabs Row */}
        <div className="flex items-center gap-1">
          {/* Render all tabs */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTabId === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {/* Use translation for default dashboard tab, custom name for user-created tabs */}
              {tab.id === 'dashboard' ? t(tk('tabs.dashboard')) : tab.name}
            </button>
          ))}

          {/* Add Tab Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} className="text-primary">
                <Plus className="mr-1 h-4 w-4" />
                <TextLoader skeletonClassName="h-4 w-16">
                  {t(tk('actions.add_tab'))}
                </TextLoader>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[512px]">
              <DialogHeader>
                <DialogTitle>
                  <TextLoader skeletonClassName="h-6 w-24">
                    {t(tk('add_tab_dialog.title'))}
                  </TextLoader>
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder={t(tk('add_tab_dialog.placeholder'))}
                  className="w-full"
                  value={newTabName}
                  onChange={(e) => setNewTabName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTab();
                    }
                  }}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={ButtonVariant.Outline}>
                    <TextLoader skeletonClassName="h-5 w-16">
                      {t(tk('add_tab_dialog.cancel'))}
                    </TextLoader>
                  </Button>
                </DialogClose>
                <Button variant={ButtonVariant.Default} onClick={handleAddTab}>
                  <TextLoader skeletonClassName="h-5 w-10">
                    {t(tk('add_tab_dialog.add'))}
                  </TextLoader>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Tabs Dropdown Menu - 3 dots after Add tab, only show if there are user-created tabs */}
          {tabs.length > 1 && (
            <div className="relative">
              <button
                onClick={() => setIsTabsDropdownOpen(!isTabsDropdownOpen)}
                className="rounded p-1.5 text-primary hover:bg-primary/10"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
              
              {/* Dropdown */}
              {isTabsDropdownOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsTabsDropdownOpen(false)} 
                />
                
                {/* Dropdown content - only user-created tabs */}
                <div className="absolute right-0 top-full z-50 mt-1 min-w-[180px] rounded-md border border-border bg-card py-1 shadow-lg">
                  {tabs.filter(tab => tab.id !== 'dashboard').map((tab) => (
                    <div 
                      key={tab.id}
                      className="group flex items-center justify-between px-3 py-2 hover:bg-muted"
                    >
                      <span className="flex-1 text-sm">{tab.name}</span>
                      {/* Edit/Delete icons - show on hover */}
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEditTab(tab.id, tab.name);
                          }}
                          className="rounded p-1 text-primary hover:bg-primary/10"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTab(tab.id);
                          }}
                          className="rounded p-1 text-destructive hover:bg-destructive/10"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            </div>
          )}

          {/* Edit Tab Dialog */}
          <Dialog open={!!editingTabId} onOpenChange={(open) => !open && handleCancelTabEdit()}>
            <DialogContent className="sm:max-w-[512px]">
              <DialogHeader>
                <DialogTitle>
                  <TextLoader skeletonClassName="h-6 w-24">
                    {t(tk('edit_tab_dialog.title'))}
                  </TextLoader>
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder={t(tk('edit_tab_dialog.placeholder'))}
                  className="w-full"
                  value={editingTabName}
                  onChange={(e) => setEditingTabName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveTabEdit();
                    }
                  }}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={ButtonVariant.Outline} onClick={handleCancelTabEdit}>
                    <TextLoader skeletonClassName="h-5 w-16">
                      {t(tk('edit_tab_dialog.cancel'))}
                    </TextLoader>
                  </Button>
                </DialogClose>
                <Button variant={ButtonVariant.Default} onClick={handleSaveTabEdit}>
                  <TextLoader skeletonClassName="h-5 w-10">
                    {t(tk('edit_tab_dialog.save'))}
                  </TextLoader>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} onClick={() => setIsAddWidgetOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            <TextLoader skeletonClassName="h-4 w-20">
              {t(tk('actions.add_widget'))}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
            <Download className="mr-1 h-4 w-4" />
            <TextLoader skeletonClassName="h-4 w-16">
              {t(tk('actions.download'))}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
            <Send className="mr-1 h-4 w-4" />
            <TextLoader skeletonClassName="h-4 w-12">
              {t(tk('actions.send'))}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
            <Maximize2 className="mr-1 h-4 w-4" />
            <TextLoader skeletonClassName="h-4 w-14">
              {t(tk('actions.expand'))}
            </TextLoader>
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Icon}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - Show widgets or empty state based on active tab */}
      {tabs.find((tab) => tab.id === activeTabId)?.hasWidgets || currentTabWidgets.length > 0 ? (
        /* Widgets Grid for tabs with predefined widgets */
        <div className="flex-1 overflow-auto">
          <DashboardWidgetsGrid 
            customWidgets={currentTabWidgets}
            onRemoveCustomWidget={handleRemoveCustomWidget}
          />
        </div>
      ) : (
        /* Empty State for tabs without widgets */
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Empty State Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Gauge className="h-8 w-8 text-primary" />
            </div>

            {/* Empty State Title */}
            <TextLoader skeletonClassName="h-7 w-64">
              <h2 className="text-xl font-semibold">
                {t(tk('empty_state.title'))}
              </h2>
            </TextLoader>

            {/* Empty State Subtitle */}
            <TextLoader skeletonClassName="h-5 w-96">
              <p className="max-w-md text-muted-foreground">
                {t(tk('empty_state.subtitle'))}
              </p>
            </TextLoader>

            {/* Helper Actions */}
            <div className="mt-2 flex items-center gap-4">
              <Button variant={ButtonVariant.Link} className="text-primary">
                <TextLoader skeletonClassName="h-4 w-20">
                  {t(tk('empty_state.view_demo'))}
                </TextLoader>
              </Button>
              <Button variant={ButtonVariant.Link} className="text-primary">
                <TextLoader skeletonClassName="h-4 w-40">
                  {t(tk('empty_state.how_to_create'))}
                </TextLoader>
              </Button>
              <Button variant={ButtonVariant.Link} className="text-primary">
                <TextLoader skeletonClassName="h-4 w-44">
                  {t(tk('empty_state.copy_existing'))}
                </TextLoader>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Widget Panel */}
      <AddWidgetPanel
        isOpen={isAddWidgetOpen}
        onClose={() => setIsAddWidgetOpen(false)}
        onAddWidget={handleAddWidget}
      />
        </>
        )}
      </div>
    </div>
  );
};

OverviewScreen.displayName = 'OverviewScreen';

// Default export for lazy loading
export default OverviewScreen;

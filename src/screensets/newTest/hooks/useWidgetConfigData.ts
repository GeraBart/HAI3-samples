/**
 * useWidgetConfigData Hook
 * Simple hook to access widget configuration data
 */

import { useMemo, useCallback, useState } from 'react';
import {
  datasources,
  getDatasourceByName,
  getMockData as getMockDataFromConfig,
  getAvailableFields as getAvailableFieldsFromConfig,
  widgets as initialWidgets,
} from '../config';
import type { Widget, WidgetTemplateConfig } from '../config/types';

// Store custom widgets in memory (in real app, this would be persisted)
let customWidgets: Widget[] = [];

export interface SaveWidgetParams {
  name: string;
  description: string;
  datasourceName: string;
  templateType: string;
  config: WidgetTemplateConfig;
}

export function useWidgetConfigData() {
  const [catalogWidgets, setCatalogWidgets] = useState<Widget[]>([...initialWidgets, ...customWidgets]);
  
  const datasourceNames = useMemo(() => {
    return datasources.map((ds) => ds.name);
  }, []);

  const getMockData = useCallback((datasourceName: string) => {
    return getMockDataFromConfig(datasourceName);
  }, []);

  const getAvailableFields = useCallback((datasourceName: string) => {
    return getAvailableFieldsFromConfig(datasourceName);
  }, []);

  const getDatasource = useCallback((name: string) => {
    return getDatasourceByName(name);
  }, []);

  const saveWidgetToCatalog = useCallback((params: SaveWidgetParams) => {
    const { name, description, datasourceName, templateType, config } = params;
    
    // Get the datasource func id
    const datasource = getDatasourceByName(datasourceName);
    if (!datasource) return null;
    
    // Map template type to template id
    const templateIdMap: Record<string, string> = {
      donut: 'cti.a.p.wr.template.v1.0~a.p.widget.v1.0~a.p.pie_chart.v1.0',
      bar: 'cti.a.p.wr.template.v1.0~a.p.widget.v1.0~a.p.bar_chart.v1.0',
      table: 'cti.a.p.wr.template.v1.0~a.p.widget.v1.0~a.p.table.v1.0',
      list: 'cti.a.p.wr.template.v1.0~a.p.widget.v1.0~a.p.list.v1.0',
      legend: 'cti.a.p.wr.template.v1.0~a.p.widget.v1.0~a.p.legend.v1.0',
      treemap: 'cti.a.p.wr.template.v1.0~a.p.widget.v1.0~a.p.treemap.v1.0',
    };
    
    // Create new widget
    const newWidget: Widget = {
      id: `custom.widget.${Date.now()}`,
      icon: '',
      title: name,
      description: description,
      hsize: 'SMALL',
      vsize: 'SMALL',
      categories: ['custom'],
      settings: {
        datasource: {
          func: datasource.func.id,
        },
        template: {
          id: templateIdMap[templateType] || templateIdMap.donut,
          config: {
            title: name,
            ...config,
          },
        },
      },
    };
    
    // Add to custom widgets
    customWidgets = [...customWidgets, newWidget];
    setCatalogWidgets([...initialWidgets, ...customWidgets]);
    
    return newWidget;
  }, []);

  return {
    datasourceNames,
    datasources,
    catalogWidgets,
    getMockData,
    getAvailableFields,
    getDatasource,
    saveWidgetToCatalog,
  };
}

export default useWidgetConfigData;

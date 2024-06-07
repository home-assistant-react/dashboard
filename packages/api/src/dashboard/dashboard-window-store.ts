import { PanelFC, PropertyControllerFc } from "@home-assistant-react/types/src";
import { Context } from "react";

/**
 * Dashboard window store.
 * This class provides functionality for managing panels, property controllers,
 * loaded plugins, and contexts within a dashboard window. It is primarily used
 * to register global contexts to enable sharing context between externally loaded plugins.
 */
export class DashboardWindowStore {
  /**
   * Record storing panels by their IDs.
   */
  private panels: Record<string, PanelFC> = {};

  /**
   * Record storing property controllers by their IDs.
   */
  private propertyControllers: Record<string, PropertyControllerFc> = {};

  /**
   * Record tracking loaded plugins.
   */
  private loadedPlugins: Record<string, boolean> = {};

  /**
   * Record storing React contexts.
   */
  private contexts: Record<string, Context<unknown>> = {};

  /**
   * Constructs a new instance of the DashboardWindowStore class.
   */
  constructor() {
    // Constructor logic
  }

  /**
   * Registers a context with the specified name.
   * @param contextName - The name of the context.
   * @param context - The React context to register.
   */
  registerContext<T>(contextName: string, context: Context<T>): void {
    this.contexts[contextName] = context as Context<unknown>;
  }

  /**
   * Registers a panel component with the specified panel ID.
   * @param panelId - The ID of the panel.
   * @param component - The panel component to register.
   * @throws Error if the panel is already registered.
   */
  registerPanelComponent(panelId: string, component: PanelFC): void {
    if (this.panels[panelId])
      throw new Error(`Panel ${panelId} already registered`);
    this.panels[panelId] = component;
  }

  /**
   * Registers a property controller component with the specified property ID.
   * @param propertyId - The ID of the property controller.
   * @param component - The property controller component to register.
   * @throws Error if the property controller is already registered.
   */
  registerPropertyControllerComponent(
    propertyId: string,
    component: PropertyControllerFc,
  ): void {
    if (this.propertyControllers[propertyId])
      throw new Error(`PropertyController ${propertyId} already registered`);
    this.propertyControllers[propertyId] = component;
  }

  /**
   * Retrieves the registered panel component associated with the specified panel ID.
   * @param panelId - The ID of the panel.
   * @throws Error if the panel is not registered.
   * @returns The registered panel component.
   */
  getRegisteredPanelComponent(panelId: string): PanelFC {
    if (!this.panels[panelId])
      throw new Error(`Panel ${panelId} not registered`);
    return this.panels[panelId];
  }

  /**
   * Retrieves the registered property controller component associated with the specified property ID.
   * @param propertyId - The ID of the property controller.
   * @throws Error if the property controller is not registered.
   * @returns The registered property controller component.
   */
  getRegisteredPropertyControllerComponent(
    propertyId: string,
  ): PropertyControllerFc {
    if (!this.propertyControllers[propertyId])
      throw new Error(`PropertyController ${propertyId} not registered`);
    return this.propertyControllers[propertyId];
  }

  /**
   * Loads a panel component from the specified URL.
   * @param url - The URL of the panel component to load.
   */
  async loadPanelComponent(url: string): Promise<void> {
    const script = document.createElement("script");
    this.loadedPlugins[url] = false;

    script.src = url;
    script.async = false;
    script.onload = () => {
      this.loadedPlugins[url] = true;
    };
    script.onerror = () => {
      this.loadedPlugins[url] = true;
      throw new Error(`Error loading panel component from ${url}`);
    };

    document.body.appendChild(script);
  }

  /**
   * Checks if all plugins have been loaded.
   * @returns True if all plugins are loaded, false otherwise.
   */
  isAllPluginsLoaded(): boolean {
    return Object.values(this.loadedPlugins).every(Boolean);
  }

  /**
   * Retrieves a record of all loaded panels.
   * @returns A record of all loaded panels.
   */
  getLoadedPanels(): Record<string, PanelFC> {
    return this.panels;
  }

  /**
   * Retrieves the registered context associated with the specified context name.
   * @param contextName - The name of the context.
   * @throws Error if the context is not registered.
   * @returns The registered context.
   */
  getRegisteredContext<T>(contextName: string): Context<T> {
    if (!this.contexts[contextName]) {
      throw new Error(`Context ${contextName} not registered`);
    }
    return this.contexts[contextName] as unknown as Context<T>;
  }
}

import type { App, AppContext, Plugin, Component } from 'vue';

type SFCWithInstall<T> = T & Plugin;

type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

const INSTALLED_KEY = Symbol('INSTALLED_KEY');

const withInstall = <T, E extends Record<string, any>>(components: Component[]) => {
  const install = (app: App, options): void => {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;

    components.forEach((comp: Component) => {
      const _comp = comp as SFCWithInstall<typeof comp>;
      app.component(comp.name, comp);
    });
  };

  // return components as SFCWithInstall<T> & E;
  return { install, ...components };
};

export { withInstall };

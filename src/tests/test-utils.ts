export type RenderResult = {
  container: HTMLElement;
};

const createContainer = (): HTMLElement => {
  if (typeof document !== "undefined" && document.createElement) {
    return document.createElement("div");
  }
  return ({
    querySelector: () => null,
  } as unknown) as HTMLElement;
};

export const GlobalTestState: {
  renderResult: RenderResult;
} = {
  renderResult: { container: createContainer() },
};

export const render = async (..._args: any[]): Promise<RenderResult> => {
  return GlobalTestState.renderResult;
};

export const queryByTestId = (
  container: HTMLElement,
  testId: string,
): HTMLElement | null => {
  if (container && typeof container.querySelector === "function") {
    return container.querySelector(`[data-testid="${testId}"]`);
  }
  return null;
};

export const withExcalidrawDimensions = async (
  _dimensions: { width: number; height: number },
  callback: () => void | Promise<void>,
) => {
  await callback();
};

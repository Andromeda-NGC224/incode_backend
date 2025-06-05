export const autobind = (instance: object): void => {
  const proto = Object.getPrototypeOf(instance);

  for (const key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);

    const isConstructor = key === 'constructor';
    const isDescriptorFunction = typeof descriptor?.value === 'function';
    if (isConstructor || !isDescriptorFunction) continue;

    Object.defineProperty(instance, key, {
      value: descriptor.value.bind(instance),
    });
  }
};

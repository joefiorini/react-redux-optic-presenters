export default function(...presenters) {
  return {
    connect(Component) {
      return presenters
        .map(p => p.connect)
        .reduce((connect, current) => C => connect(current(C)), C => C)(
        Component
      );
    },
  };
}

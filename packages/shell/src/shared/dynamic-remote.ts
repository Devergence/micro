import { init, loadRemote } from '@module-federation/enhanced/runtime';

// Инициализация runtime
init({
  name: 'shell',
  remotes: [], // Начинаем без ремоутов
});

// Динамическая регистрация и загрузка ремоута
export async function loadDynamicRemote<T>(
  remoteName: string,
  remoteUrl: string,
  exposedModule: string
): Promise<T> {
  // Регистрируем ремоут в runtime
  const remoteInfo = {
    name: remoteName,
    entry: remoteUrl,
  };

  try {
    // Загружаем модуль
    const module = await loadRemote<T>(
      \`\${remoteName}/\${exposedModule}\
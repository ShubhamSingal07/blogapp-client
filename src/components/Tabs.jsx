export function Tabs({ setSelectedTab, tabs }) {
  return (
    <ul className="flex flex-wrap m-auto mt-4 lg:w-2/5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400">
      {tabs.map(tab => (
        <li key={tab} className="mr-2">
          <span
            onClick={() => setSelectedTab(tab)}
            className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:text-blue-500 cursor-pointer">
            {tab}
          </span>
        </li>
      ))}
    </ul>
  );
}

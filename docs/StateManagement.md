# State Management

This project uses a hybrid state management approach combining multiple strategies rather than a single centralized state management library like Redux or Zustand.

## Hybrid Approach

Here are the strategies used:

### React Context API

We have used custom react context providers to support local authentication
This allows us to provide the logged in user data available globally, to all child components without prop drilling.

**Example:**
Showing user information in Sidebar component, fullname with email

```typescript
const { user } = useAuth();
```

Using this simple hook allows us to access the user in any child component wrapped in **<AuthContext.Provider>**

### React Query (Tanstack query)

This package helps to manage server-side data fetching, caching and synchronization.

**Example**
Fetching data every 20 seconds for asset and portfolio.
This handles the data, loading state and also errors.

We use this inside a custom hook, so it is easier for components to values directly without looking at its implementation (encapsulation)

```typescript
const { assets, loading, error } = useAssets();
```

Actual react query config looks like this:

```typescript
export const useAssets = () => {
	const {
		data: assets = [],
		isLoading: loading,
		error,
	} = useQuery<AssetView[]>({
		queryKey: ["assets"],
		queryFn: async () => {
			const response = await AssetService.getAllAssets();
			return response;
		},
		// Refetch every 20 seconds
		refetchInterval: 20000,
	});

	return { assets, loading, error };
};
```

### Local Component State (useState)

Using local state is the simplest way of mainting state.
However, it is important to examine which values can be considered as state as it can affect the performance of the component and application overall.

We have to be careful on re-rendering problem and circular dependency problems when working on local component state level stage management.

```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

### Local Storage (Persistence Layer)

Used for persisiting state across sessions

**Example**

We store users information (users list) in local storage and check its value when required, used as persistence state

We also use theme value to be persisted (light/dark modes)

### Service Class

Service classes handle the **Business Logic** of the application

-   AuthService: CRUD operations for user auth in localStorage
-   AssetService, PortfolioService, UserService: API communication layer

These services **abstract data operations** and are consumed by React Query hooks

## Conclusion

-   No Redux/Zustand: Project doesn't use traditional global state libraries
-   Server vs Client State Separation: React Query handles server data, Context handles auth
-   Automatic Data Synchronization: 20-second intervals for portfolios/assets
-   Optimistic UI: React Query provides caching for instant UI updates
-   Type Safety: Full TypeScript integration with typed contexts and hooks

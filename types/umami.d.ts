export {};

declare global {
	interface Window {
		umami?: {
			track: (
				payload?:
					| string
					| Record<string, unknown>
					| ((props: Record<string, unknown>) => Record<string, unknown>),
				eventData?: Record<string, unknown>,
			) => void;
		};
	}
}

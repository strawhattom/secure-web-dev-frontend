import type { Handle } from '@sveltejs/kit';
import * as api from '$lib/api';

export const handle = (async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	if (!jwt) return resolve(event);
	const response = await api.get('users/me', jwt);
	event.locals.user = response.ok ? { jwt, ...response.result } : null;
	return await resolve(event);
}) satisfies Handle;

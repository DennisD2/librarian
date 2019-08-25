/**
 * Calculate remote id from REST self URI
 * @param selfUrl
 */
export function getRemoteId(selfUrl: string): string {
    let parts = selfUrl.split("/");
    let id = parts[parts.length - 1];
    console.log("remote id: " + id);
    return id;
}

/**
 * Create ASCII string representation from a string that can be used inside URIs/routes.
 *
 * @param s
 */
export function escape(s: string) {
    return btoa(s);
}
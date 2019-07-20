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
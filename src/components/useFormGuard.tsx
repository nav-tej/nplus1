"use client";

import { useEffect, useRef } from "react";
import { HONEYPOT_FIELD } from "@/lib/form-guard";

/**
 * Client half of the form bot checks. Render `honeypot` inside the form and spread
 * `guardFields()` into the JSON body. Real visitors never see or fill the field.
 */
export function useFormGuard() {
  const trap = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const honeypot = (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Leave this field empty
        <input ref={trap} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );

  const guardFields = () => ({
    [HONEYPOT_FIELD]: trap.current?.value ?? "",
    elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : undefined,
  });

  return { honeypot, guardFields };
}

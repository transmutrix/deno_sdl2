import {
  i32,
  SizedFFIType,
  Struct,
  u16,
  u32,
  u8,
  pointer,
  // cstring
} from "https://deno.land/x/byte_type@0.1.7/ffi.ts";

let DENO_SDL2_PATH: string | undefined;
try {
  DENO_SDL2_PATH = Deno.env.get("DENO_SDL2_PATH");
} catch (_) {
  // ignore, this can only fail if permission is not given
}

const OS_PREFIX = Deno.build.os === "windows" ? "" : "lib";
const OS_SUFFIX = Deno.build.os === "windows"
  ? ".dll"
  : Deno.build.os === "darwin"
  ? ".dylib"
  : ".so";

function getLibraryPath(lib: string): string {
  lib = `${OS_PREFIX}${lib}${OS_SUFFIX}`;
  if (DENO_SDL2_PATH) {
    return `${DENO_SDL2_PATH}/${lib}`;
  } else {
    return lib;
  }
}

const sdl2 = Deno.dlopen(getLibraryPath("SDL2"), {
  "SDL_Init": {
    "parameters": ["u32"],
    "result": "i32",
  },
  "SDL_InitSubSystem": {
    "parameters": ["u32"],
    "result": "i32",
  },
  "SDL_QuitSubSystem": {
    "parameters": ["u32"],
    "result": "i32",
  },
  "SDL_GetPlatform": {
    "parameters": [],
    "result": "pointer",
  },
  "SDL_GetError": {
    "parameters": [],
    "result": "pointer",
  },
  "SDL_PollEvent": {
    "parameters": ["pointer"],
    "result": "i32",
  },
  "SDL_GetCurrentVideoDriver": {
    "parameters": [],
    "result": "pointer",
  },
  "SDL_CreateWindow": {
    "parameters": [
      "pointer",
      "i32",
      "i32",
      "i32",
      "i32",
      "u32",
    ],
    "result": "pointer",
  },
  "SDL_DestroyWindow": {
    "parameters": ["pointer"],
    "result": "i32",
  },
  "SDL_GetWindowSize": {
    "parameters": ["pointer", "pointer", "pointer"],
    "result": "i32",
  },
  "SDL_GetWindowPosition": {
    "parameters": ["pointer", "pointer", "pointer"],
    "result": "i32",
  },
  "SDL_GetWindowFlags": {
    "parameters": ["pointer"],
    "result": "u32",
  },
  "SDL_SetWindowTitle": {
    "parameters": ["pointer", "pointer"],
    "result": "i32",
  },
  "SDL_SetWindowIcon": {
    "parameters": ["pointer", "pointer"],
    "result": "i32",
  },
  "SDL_SetWindowPosition": {
    "parameters": ["pointer", "i32", "i32"],
    "result": "i32",
  },
  "SDL_SetWindowSize": {
    "parameters": ["pointer", "i32", "i32"],
    "result": "i32",
  },
  "SDL_SetWindowFullscreen": {
    "parameters": ["pointer", "u32"],
    "result": "i32",
  },
  "SDL_SetWindowMinimumSize": {
    "parameters": ["pointer", "i32", "i32"],
    "result": "i32",
  },
  "SDL_SetWindowMaximumSize": {
    "parameters": ["pointer", "i32", "i32"],
    "result": "i32",
  },
  "SDL_SetWindowBordered": {
    "parameters": ["pointer", "i32"],
    "result": "i32",
  },
  "SDL_SetWindowResizable": {
    "parameters": ["pointer", "i32"],
    "result": "i32",
  },
  "SDL_SetWindowInputFocus": {
    "parameters": ["pointer"],
    "result": "i32",
  },
  "SDL_SetWindowGrab": {
    "parameters": ["pointer", "i32"],
    "result": "i32",
  },
  "SDL_CreateRenderer": {
    "parameters": ["pointer", "i32", "u32"],
    "result": "pointer",
  },
  "SDL_SetRenderDrawColor": {
    "parameters": ["pointer", "u8", "u8", "u8", "u8"],
    "result": "i32",
  },
  "SDL_RenderClear": {
    "parameters": ["pointer"],
    "result": "i32",
  },
  "SDL_SetRenderDrawBlendMode": {
    "parameters": ["pointer", "u32"],
    "result": "i32",
  },
  "SDL_RenderPresent": {
    "parameters": ["pointer"],
    "result": "i32",
  },
  "SDL_RenderDrawPoint": {
    "parameters": ["pointer", "i32", "i32"],
    "result": "i32",
  },
  "SDL_RenderDrawPoints": {
    "parameters": ["pointer", "pointer", "i32"],
    "result": "i32",
  },
  "SDL_RenderDrawLine": {
    "parameters": ["pointer", "i32", "i32", "i32", "i32"],
    "result": "i32",
  },
  "SDL_RenderDrawLines": {
    "parameters": ["pointer", "pointer", "i32"],
    "result": "i32",
  },
  "SDL_RenderDrawRect": {
    "parameters": ["pointer", "pointer"],
    "result": "i32",
  },
  "SDL_RenderDrawRects": {
    "parameters": ["pointer", "pointer", "i32"],
    "result": "i32",
  },
  "SDL_RenderFillRect": {
    "parameters": ["pointer", "pointer"],
    "result": "i32",
  },
  "SDL_RenderFillRects": {
    "parameters": ["pointer", "pointer", "i32"],
    "result": "i32",
  },
  "SDL_RenderCopy": {
    "parameters": ["pointer", "pointer", "pointer", "pointer"],
    "result": "i32",
  },
  "SDL_RenderCopyEx": {
    "parameters": [
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "f32",
      "pointer",
      "u32",
    ],
    "result": "i32",
  },
  "SDL_RenderReadPixels": {
    "parameters": ["pointer", "pointer", "u32", "pointer", "i32"],
    "result": "i32",
  },
  "SDL_GetRenderTarget": {
    "parameters": ["pointer"],
    "result": "pointer"
  },
  "SDL_SetRenderTarget": {
    "parameters": ["pointer", "pointer"],
    "result": "i32"
  },
  "SDL_GetRenderDrawColor": {
    "parameters": ["pointer", "pointer", "pointer", "pointer", "pointer"],
    "result": "i32"
  },
  "SDL_CreateTexture": {
    "parameters": ["pointer", "u32", "i32", "i32", "i32"],
    "result": "pointer",
  },
  "SDL_DestroyTexture": {
    "parameters": ["pointer"],
    "result": "i32",
  },
  "SDL_QueryTexture": {
    "parameters": [
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
    ],
    "result": "i32",
  },
  "SDL_SetTextureColorMod": {
    "parameters": ["pointer", "u8", "u8", "u8"],
    "result": "i32",
  },
  "SDL_SetTextureAlphaMod": {
    "parameters": ["pointer", "u8"],
    "result": "i32",
  },
  "SDL_SetTextureBlendMode": {
    "parameters": ["pointer", "u32"],
    "result": "i32",
  },
  "SDL_UpdateTexture": {
    "parameters": ["pointer", "pointer", "pointer", "i32"],
    "result": "i32",
  },
  "SDL_SetTextureScaleMode": {
    "parameters": ["pointer", "i32"],
    "result": "i32",
  },
  "SDL_LoadBMP_RW": {
    "parameters": ["pointer"],
    "result": "pointer",
  },
  "SDL_CreateTextureFromSurface": {
    "parameters": ["pointer", "pointer"],
    "result": "pointer",
  },
});

const sdl2Image = Deno.dlopen(getLibraryPath("SDL2_image"), {
  "IMG_Init": {
    "parameters": ["u32"],
    "result": "u32",
  },
  "IMG_Load": {
    "parameters": ["pointer"],
    "result": "pointer",
  },
});

const sdl2Font = Deno.dlopen(getLibraryPath("SDL2_ttf"), {
  "TTF_Init": {
    "parameters": [],
    "result": "u32",
  },
  "TTF_OpenFont": {
    "parameters": ["pointer", "i32"],
    "result": "pointer",
  },
  "TTF_RenderText_Solid": {
    "parameters": ["pointer", "pointer", "pointer"],
    "result": "pointer",
  },
  "TTF_RenderText_Shaded": {
    "parameters": ["pointer", "pointer", "pointer", "pointer"],
    "result": "pointer",
  },
  "TTF_RenderText_Blended": {
    "parameters": ["pointer", "pointer", "pointer"],
    "result": "pointer",
  },
  "TTF_CloseFont": {
    "parameters": ["pointer"],
    "result": "i32",
  },
  "TTF_Quit": {
    "parameters": [],
    "result": "i32",
  },
});

let context_alive = false;
function init() {
  if (context_alive) {
    return;
  }
  context_alive = true;
  const result = sdl2.symbols.SDL_Init(0);
  if (result !== 0) {
    const errPtr = sdl2.symbols.SDL_GetError();
    const view = new Deno.UnsafePointerView(errPtr);
    throw new Error(`SDL_Init failed: ${view.getCString()}`);
  }

  const platform = sdl2.symbols.SDL_GetPlatform();
  const view = new Deno.UnsafePointerView(platform);
  console.log(`SDL2 initialized on ${view.getCString()}`);
  // Initialize subsystems
  // SDL_INIT_EVENTS
  {
    const result = sdl2.symbols.SDL_InitSubSystem(0x00000001);
    if (result !== 0) {
      const errPtr = sdl2.symbols.SDL_GetError();
      const view = new Deno.UnsafePointerView(errPtr);
      throw new Error(`SDL_InitSubSystem failed: ${view.getCString()}`);
    }
  }
  // SDL_INIT_VIDEO
  {
    const result = sdl2.symbols.SDL_InitSubSystem(0x00000010);
    if (result !== 0) {
      const errPtr = sdl2.symbols.SDL_GetError();
      const view = new Deno.UnsafePointerView(errPtr);
      throw new Error(`SDL_InitSubSystem failed: ${view.getCString()}`);
    }
  }
  // SDL_INIT_IMAGE
  {
    const result = sdl2.symbols.SDL_InitSubSystem(0x00000004);
    if (result !== 0) {
      const errPtr = sdl2.symbols.SDL_GetError();
      const view = new Deno.UnsafePointerView(errPtr);
      throw new Error(`SDL_InitSubSystem failed: ${view.getCString()}`);
    }
  }
  // IMG_Init
  {
    // TIF = 4, WEBP = 8
    sdl2Image.symbols.IMG_Init(1 | 2); // png and jpg
  }
  // SDL_INIT_TTF
  {
    const result = sdl2.symbols.SDL_InitSubSystem(0x00000100);
    if (result !== 0) {
      const errPtr = sdl2.symbols.SDL_GetError();
      const view = new Deno.UnsafePointerView(errPtr);
      throw new Error(`SDL_InitSubSystem failed: ${view.getCString()}`);
    }
  }
  // TTF_Init
  {
    sdl2Font.symbols.TTF_Init();
  }
}

init();

export enum EventType {
  First = 0,
  Quit = 0x100,
  AppTerminating = 0x101,
  AppLowMemory = 0x102,
  AppWillEnterBackground = 0x103,
  AppDidEnterBackground = 0x104,
  AppWillEnterForeground = 0x105,
  AppDidEnterForeground = 0x106,
  WindowEvent = 0x200,
  KeyDown = 0x300,
  KeyUp = 0x301,
  MouseMotion = 0x400,
  MouseButtonDown = 0x401,
  MouseButtonUp = 0x402,
  MouseWheel = 0x403,
  //  JoyAxisMotion = 0x600,
  //  JoyBallMotion = 0x601,
  //  JoyHatMotion = 0x602,
  //  JoyButtonDown = 0x603,
  //  JoyButtonUp = 0x604,
  //  JoyDeviceAdded = 0x605,
  //  JoyDeviceRemoved = 0x606,
  //  ControllerAxisMotion = 0x650,
  //  ControllerButtonDown = 0x651,
  //  ControllerButtonUp = 0x652,
  //  ControllerDeviceAdded = 0x653,
  //  ControllerDeviceRemoved = 0x654,
  //  ControllerDeviceRemapped = 0x655,
  //  FingerDown = 0x700,
  //  FingerUp = 0x701,
  //  FingerMotion = 0x702,
  //  DollarGesture = 0x800,
  //  DollarRecord = 0x801,
  //  MultiGesture = 0x802,
  //  ClipboardUpdate = 0x900,
  //  DropFile = 0x1000,
  //  DropText = 0x1001,
  //  DropBegin = 0x1002,
  //  DropComplete = 0x1003,
  AudioDeviceAdded = 0x1100,
  AudioDeviceRemoved = 0x1101,
  //  RenderTargetsReset = 0x2000,
  //  RenderDeviceReset = 0x2001,
  User = 0x8000,
  Last = 0xFFFF,
  Draw,
}

const _raw = Symbol("raw");
function asCString(str: string): Uint8Array {
  // @ts-ignore: Deno.core is not public API.
  return Deno.core.encode(`${str}\0`);
}

function throwSDLError(): never {
  const error = sdl2.symbols.SDL_GetError();
  const view = new Deno.UnsafePointerView(error);
  throw new Error(`SDL Error: ${view.getCString()}`);
}

interface TexturePreviousRenderState {
  target: Deno.UnsafePointer;
  newTarget: Deno.UnsafePointer;
  r: number;
  g: number;
  b: number;
  a: number;
}

export class Canvas {
  private _previousTargetState?: TexturePreviousRenderState;
  
  constructor(
    private window: Deno.UnsafePointer,
    private target: Deno.UnsafePointer,
  ) {}

  setDrawColor(r: number, g: number, b: number, a: number) {
    const ret = sdl2.symbols.SDL_SetRenderDrawColor(this.target, r, g, b, a);
    if (ret < 0) {
      throwSDLError();
    }
  }

  clear() {
    const ret = sdl2.symbols.SDL_RenderClear(this.target);
    if (ret < 0) {
      throwSDLError();
    }
  }

  present() {
    sdl2.symbols.SDL_RenderPresent(this.target);
  }

  drawPoint(x: number, y: number) {
    const ret = sdl2.symbols.SDL_RenderDrawPoint(this.target, x, y);
    if (ret < 0) {
      throwSDLError();
    }
  }

  drawPoints(points: [number, number][]) {
    const intArray = new Int32Array(points.flat());
    const ret = sdl2.symbols.SDL_RenderDrawPoints(
      this.target,
      Deno.UnsafePointer.of(intArray),
      intArray.length,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    const ret = sdl2.symbols.SDL_RenderDrawLine(this.target, x1, y1, x2, y2);
    if (ret < 0) {
      throwSDLError();
    }
  }

  drawLines(points: [number, number][]) {
    const intArray = new Int32Array(points.flat());
    const ret = sdl2.symbols.SDL_RenderDrawLines(
      this.target,
      Deno.UnsafePointer.of(intArray),
      intArray.length,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  drawRect(x: number, y: number, w: number, h: number) {
    const intArray = new Int32Array([x, y, w, h]);
    const ret = sdl2.symbols.SDL_RenderDrawRect(
      this.target,
      Deno.UnsafePointer.of(intArray),
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  drawRects(rects: [number, number, number, number][]) {
    const intArray = new Int32Array(rects.flat());
    const ret = sdl2.symbols.SDL_RenderDrawRects(
      this.target,
      Deno.UnsafePointer.of(intArray),
      intArray.length,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  fillRect(x: number, y: number, w: number, h: number) {
    const intArray = new Int32Array([x, y, w, h]);
    const ret = sdl2.symbols.SDL_RenderFillRect(
      this.target,
      Deno.UnsafePointer.of(intArray),
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  fillRects(rects: [number, number, number, number][]) {
    const intArray = new Int32Array(rects.flat());
    const ret = sdl2.symbols.SDL_RenderFillRects(
      this.target,
      Deno.UnsafePointer.of(intArray),
      intArray.length,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  copy(texture: Texture, source?: Rect, dest?: Rect) {
    const ret = sdl2.symbols.SDL_RenderCopy(
      this.target,
      texture[_raw],
      source ? source[_raw] : null,
      dest ? dest[_raw] : null,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  textureCreator() {
    return new TextureCreator(this.target);
  }

  loadFont(path: string, size: number) {
    const raw = sdl2Font.symbols.TTF_OpenFont(asCString(path), size);
    return new Font(raw);
  }

  bindRenderTarget(target: Texture) {
    const query = target.query();
    if (query.access !== TextureAccess.Target) {
      throw new Error("Canvas.bindRenderTarget: Target texture access must be TextureAccess.Target");
    }
    if (this._previousTargetState) {
      throw new Error("Canvas.bindRenderTarget: Must unbind previous render target before binding another");
    }
    const prevR = new Uint8Array(1);
    const prevG = new Uint8Array(1);
    const prevB = new Uint8Array(1);
    const prevA = new Uint8Array(1);
    let ret = sdl2.symbols.SDL_GetRenderDrawColor(this.target,
      Deno.UnsafePointer.of(prevR),
      Deno.UnsafePointer.of(prevG),
      Deno.UnsafePointer.of(prevB),
      Deno.UnsafePointer.of(prevA));
      if (ret < 0) {
        throwSDLError();
      }
      const prevTarget = sdl2.symbols.SDL_GetRenderTarget(this.target);
    ret = sdl2.symbols.SDL_SetRenderTarget(this.target, target[_raw]);
    if (ret < 0) {
      throwSDLError();
    }
    this._previousTargetState = {
      target: prevTarget,
      newTarget: target[_raw],
      r: prevR[0],
      g: prevG[0],
      b: prevB[0],
      a: prevA[0]
    };
  }

  unbindRenderTarget(target: Texture) {
    const query = target.query();
    if (query.access !== TextureAccess.Target) {
      throw new Error("Canvas.unbindRenderTarget: Target texture access must be TextureAccess.Target");
    }
    if (!this._previousTargetState) {
      throw new Error("Canvas.unbindRenderTarget: No render target bound. Cannot unbind.");
    }
    const {target: prevTarget, newTarget: matchTarget, r, g, b, a} = this._previousTargetState;

    // FIXME (Charlie): For some reason, SDL_GetRenderTarget returns a non-NULL pointer which is different to
    //     the one we gave it. The value is consistent between calls, and I know the render target itself is
    //     correct because it can be rendered to without issues. The pointer is the wrong value though.
    //     Alignment / padding issue for Deno/SDL2 on M1?
    // if (curTarget.valueOf() !== target[_raw].valueOf()) {
    if (matchTarget.valueOf() !== target[_raw].valueOf()) {
      throw new Error("Canvas.unbindRenderTarget: Bound target and passed target are different!");
    }
    
    let ret = sdl2.symbols.SDL_SetRenderTarget(this.target, prevTarget);
    if (ret < 0) {
      throwSDLError();
    }
    ret = sdl2.symbols.SDL_SetRenderDrawColor(this.target, r, g, b, a);
    if (ret < 0) {
      throwSDLError();
    }
    this._previousTargetState = undefined;
  }

  // TODO: convenience renderCopy functions (render a tile, render a sprite frame, etc.)?
}

export class Font {
  [_raw]: Deno.UnsafePointer;
  constructor(raw: Deno.UnsafePointer) {
    this[_raw] = raw;
  }

  renderSolid(text: string, color: Color) {
    const raw = sdl2Font.symbols.TTF_RenderText_Solid(
      this[_raw],
      asCString(text),
      color[_raw],
    );
    return new Texture(raw);
  }

  renderBlended(text: string, color: Color) {
    const raw = sdl2Font.symbols.TTF_RenderText_Blended(
      this[_raw],
      asCString(text),
      color[_raw],
    );
    return new Texture(raw);
  }
}

export class Color {
  [_raw]: Deno.UnsafePointer;
  constructor(r: number, g: number, b: number, a: number = 0xff) {
    const raw = new Uint8Array([r, g, b, a]);
    this[_raw] = Deno.UnsafePointer.of(raw);
  }
}

export enum PixelFormat {
  Unknown = 0,
  Index1LSB = 286261504,
  Index1MSB = 287310080,
  Index4LSB = 303039488,
  Index4MSB = 304088064,
  Index8 = 318769153,
  RGB332 = 336660481,
  XRGB4444 = 353504258,
  XBGR4444 = 357698562,
  XRGB1555 = 353570562,
  XBGR1555 = 357764866,
  ARGB4444 = 355602434,
  RGBA4444 = 356651010,
  ABGR4444 = 359796738,
  BGRA4444 = 360845314,
  ARGB1555 = 355667970,
  RGBA5551 = 356782082,
  ABGR1555 = 359862274,
  BGRA5551 = 360976386,
  RGB565 = 353701890,
  BGR565 = 357896194,
  RGB24 = 386930691,
  BGR24 = 390076419,
  XRGB8888 = 370546692,
  RGBX8888 = 371595268,
  XBGR8888 = 374740996,
  BGRX8888 = 375789572,
  ARGB8888 = 372645892,
  RGBA8888 = 373694468,
  ABGR8888 = 376840196,
  BGRA8888 = 377888772,
  ARGB2101010 = 372711428,
  YV12 = 842094169,
  IYUV = 1448433993,
  YUY2 = 844715353,
  UYVY = 1498831189,
  YVYU = 1431918169,
}

export enum TextureAccess {
  Static = 0,
  Streaming = 1,
  Target = 2,
}

export class TextureCreator {
  constructor(private raw: Deno.UnsafePointer) {}

  createTexture(
    format: PixelFormat,
    access: TextureAccess,
    w: number,
    h: number,
  ): Texture {
    const raw = sdl2.symbols.SDL_CreateTexture(
      this.raw,
      format,
      access,
      w,
      h,
    );
    if (raw === null) {
      throwSDLError();
    }
    return new Texture(raw);
  }

  createTextureFromSurface(surface: Surface): Texture {
    const raw = sdl2.symbols.SDL_CreateTextureFromSurface(
      this.raw,
      surface[_raw],
    );
    if (raw === null) {
      throwSDLError();
    }
    return new Texture(raw);
  }
}

export interface TextureQuery {
  format: PixelFormat;
  access: TextureAccess;
  w: number;
  h: number;
}

export enum BlendMode {
  None = 0x00000000,
  Blend = 0x00000001,
  Add = 0x00000002,
  Mod = 0x00000004,
  Mul = 0x00000008,
  Invalid = 0x7FFFFFFF,
}

export enum ScaleMode {
  Nearest = 0x0,
  Linear = 0x1,
  Anisotropic = 0x2,
}

export class Texture {
  [_raw]: Deno.UnsafePointer;

  constructor(private raw: Deno.UnsafePointer) {
    this[_raw] = raw;
  }

  query(): TextureQuery {
    const format = new Uint32Array(1);
    const access = new Uint32Array(1);
    const w = new Uint32Array(1);
    const h = new Uint32Array(1);

    const ret = sdl2.symbols.SDL_QueryTexture(
      this.raw,
      Deno.UnsafePointer.of(format),
      Deno.UnsafePointer.of(access),
      Deno.UnsafePointer.of(w),
      Deno.UnsafePointer.of(h),
    );
    if (ret < 0) {
      throwSDLError();
    }
    return {
      format: format[0],
      access: access[0],
      w: w[0],
      h: h[0],
    };
  }

  get width() {
    return this.query().w;
  }

  get height() {
    return this.query().h;
  }

  get size() {
    const {w, h} = this.query();
    return {width: w, height: h};
  }

  toRect(optionalTarget?: Rect) {
    const q = this.query();
    return (optionalTarget ?? new Rect()).set(0, 0, q.w, q.h);
  }

  setColorMod(r: number, g: number, b: number) {
    const ret = sdl2.symbols.SDL_SetTextureColorMod(
      this.raw,
      r,
      g,
      b,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  setAlphaMod(a: number) {
    const ret = sdl2.symbols.SDL_SetTextureAlphaMod(this.raw, a);
    if (ret < 0) {
      throwSDLError();
    }
  }

  setBlendMode(blendMode: BlendMode) {
    const ret = sdl2.symbols.SDL_SetTextureBlendMode(this.raw, blendMode);
    if (ret < 0) {
      throwSDLError();
    }
  }

  update(pixels: Uint8Array, pitch: number, rect?: Rect) {
    const ret = sdl2.symbols.SDL_UpdateTexture(
      this.raw,
      rect ? rect[_raw] : null,
      Deno.UnsafePointer.of(pixels),
      pitch,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }

  setScaleMode(mode: ScaleMode) {
    const ret = sdl2.symbols.SDL_SetTextureScaleMode(
      this.raw,
      mode,
    );
    if (ret < 0) {
      throwSDLError();
    }
  }
}

export class Rect {
  [_raw]: Uint32Array;
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this[_raw] = new Uint32Array([x, y, w, h]);
  }

  get x() {
    return this[_raw][0];
  }

  set x(n: number) {
    this[_raw][0] = n;
  }

  get y() {
    return this[_raw][1];
  }

  set y(n: number) {
    this[_raw][1] = n;
  }

  get width() {
    return this[_raw][2];
  }

  set width(n: number) {
    this[_raw][2] = n;
  }

  get height() {
    return this[_raw][3];
  }

  set height(n: number) {
    this[_raw][3] = n;
  }

  set(x: number, y: number, w: number, h: number) {
    this[_raw][0] = x;
    this[_raw][1] = y;
    this[_raw][2] = w;
    this[_raw][3] = h;
    return this;
  }

  setPos(x: number, y: number) {
    this[_raw][0] = x;
    this[_raw][1] = y;
  }

  setSize(w: number, h: number) {
    this[_raw][2] = w;
    this[_raw][3] = h;
  }

  clear() {
    this[_raw][0] = 0;
    this[_raw][1] = 0;
    this[_raw][2] = 0;
    this[_raw][3] = 0;
    return this;
  }

  copy(r: Rect) {
    if (this !== r) {
      this[_raw][0] = r[_raw][0];
      this[_raw][1] = r[_raw][1];
      this[_raw][2] = r[_raw][2];
      this[_raw][3] = r[_raw][3];
    }
    return this;
  }

  clone() {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  hasArea() {
    return (this.width > 0 && this.height > 0);
  }

  static fromCenterSize(x: number, y: number, width: number, height: number, optionalTarget?: Rect) {
    return (optionalTarget ?? new Rect()).set(x - width * .5, y - height * .5, width, height);
  }

  static fromCenterHalfSize(x: number, y: number, xRadius: number, yRadius: number, optionalTarget?: Rect) {
    return (optionalTarget ?? new Rect()).set(x - xRadius, y - yRadius, xRadius * 2, yRadius * 2);
  }

  static fromMinMax(minX: number, minY: number, maxX: number, maxY: number, optionalTarget?: Rect) {
    return (optionalTarget ?? new Rect()).set(minX, minY, maxX - minX, maxY - minY);
  }

  static union(a: Rect, b: Rect, optionalTarget?: Rect) {
    return (optionalTarget ?? new Rect()).set(
      Math.min(a.x, b.x),
      Math.min(a.y, b.y),
      Math.max(a.width, b.width),
      Math.max(a.height, b.height)
    );
  }

  static intersection(a: Rect, b: Rect, optionalTarget?: Rect) {
    return (optionalTarget ?? new Rect()).set(
      Math.max(a.x, b.x),
      Math.max(a.y, b.y),
      Math.min(a.width, b.width),
      Math.min(a.height, b.height)
    );
  }

  static subtileByIndex(parent: Rect, sizeX: number, sizeY: number, index: number, optionalTarget?: Rect) {
    index = Math.floor(index);
    const rows = Math.floor(parent.height / sizeY);
    const cols = Math.floor(parent.width / sizeX);
    const xTile = Math.floor(index % cols);
    const yTile = Math.floor(index / cols) % rows;
    return (optionalTarget ?? new Rect()).set(
      parent.x + xTile * sizeX,
      parent.y + yTile * sizeY,
      sizeX,
      sizeY
    );
  }
}

const SDL_Rect = new Struct({
  x: i32,
  y: i32,
  width: i32,
  height: i32
});

const SDL_Surface = new Struct({
  flags: u32, // readonly
  format: pointer, // PixelFormat, readonly
  padding0_: u32,
  w: i32, // readonly
  h: i32, // readonly
  pitch: i32, // readonly
  pixels: pointer, // read-write
  userdata: pointer, // read-write
  padding2_: u32,
  locked: i32, // readonly
  list_blitmap: pointer, // private
  padding3_: u32,
  clip_rect: SDL_Rect, // readonly
  map: pointer, // SDL_BlitMap, private
  refount: i32, // read-mostly
});

export class Surface {
  [_raw]: Deno.UnsafePointer;
  private view: Deno.UnsafePointerView;

  constructor(raw: Deno.UnsafePointer) {
    this[_raw] = raw;
    this.view = new Deno.UnsafePointerView(this[_raw]);
  }

  static fromFile(path: string): Surface {
    const raw = sdl2Image.symbols.IMG_Load(asCString(path));
    if (raw === null) {
      throwSDLError();
    }
    return new Surface(raw);
  }

  static loadBmp(path: string): Surface {
    const raw = sdl2.symbols.SDL_LoadBMP_RW(asCString(path));
    if (raw === null) {
      throwSDLError();
    }
    return new Surface(raw);
  }

  get width() {
    return SDL_Surface.get(this.view, 0, "w");
  }

  get height() {
    return SDL_Surface.get(this.view, 0, "h");
  }

  get pitch() {
    return SDL_Surface.get(this.view, 0, "pitch");
  }

  get clip_rect() {
    const r = SDL_Surface.get(this.view, 0, "clip_rect");
    if (r) return new Rect(r.x, r.y, r.width, r.height);
    return new Rect();
  }
}

const sizeOfEvent = 56; // type (u32) + event
const eventBuf = new Uint8Array(sizeOfEvent);
function makeReader<T extends Record<string, SizedFFIType<unknown>>>(
  eventType: Struct<T>,
) {
  return (reader: Deno.UnsafePointerView) => {
    return eventType.read(reader);
  };
}

const SDL_QuitEvent = new Struct({
  type: u32,
  timestamp: u32,
});

const SDL_CommonEvent = new Struct({
  type: u32,
  timestamp: u32,
});

const SDL_WindowEvent = new Struct({
  type: u32,
  timestamp: u32,
  windowID: u32,
  event: u8,
  padding1: u8,
  padding2: u8,
  padding3: u8,
  data1: i32,
  data2: i32,
});

// deno-lint-ignore no-unused-vars
const SDL_DisplayEvent = new Struct({
  type: u32,
  timestamp: u32,
  display: u32,
  event: u8,
  padding1: u8,
  padding2: u8,
  padding3: u8,
  data1: i32,
  data2: i32,
});

const SDL_KeySym = new Struct({
  scancode: u32,
  sym: u32,
  _mod: u16,
  unused: u32,
});

const SDL_KeyboardEvent = new Struct({
  type: u32,
  timestamp: u32,
  windowID: u32,
  state: u8,
  repeat: u8,
  padding2: u8,
  padding3: u8,
  keysym: SDL_KeySym,
});

const SDL_MouseMotionEvent = new Struct({
  type: u32,
  timestamp: u32,
  windowID: u32,
  which: u32,
  state: u32,
  x: i32,
  y: i32,
  xrel: i32,
  yrel: i32,
});

const SDL_MouseButtonEvent = new Struct({
  type: u32,
  timestamp: u32,
  windowID: u32,
  which: u32,
  button: u8,
  state: u8,
  padding1: u8,
  padding2: u8,
  x: i32,
  y: i32,
});

const SDL_MouseWheelEvent = new Struct({
  type: u32,
  timestamp: u32,
  windowID: u32,
  which: u32,
  x: i32,
  y: i32,
});

const SDL_AudioDeviceEvent = new Struct({
  type: u32,
  timestamp: u32,
  which: u32,
  event: u8,
  padding1: u8,
  padding2: u8,
  padding3: u8,
  data1: i32,
  data2: i32,
});

const SDL_FirstEvent = new Struct({
  type: u32,
});

const SDL_LastEvent = new Struct({
  type: u32,
});

type Reader<T> = (reader: Deno.UnsafePointerView) => T;

// deno-lint-ignore no-explicit-any
const eventReader: Record<EventType, Reader<any>> = {
  [EventType.First]: makeReader(SDL_FirstEvent),
  [EventType.Quit]: makeReader(SDL_QuitEvent),
  [EventType.WindowEvent]: makeReader(SDL_WindowEvent),
  [EventType.AppTerminating]: makeReader(SDL_CommonEvent),
  [EventType.AppLowMemory]: makeReader(SDL_CommonEvent),
  [EventType.AppWillEnterBackground]: makeReader(SDL_CommonEvent),
  [EventType.AppDidEnterBackground]: makeReader(SDL_CommonEvent),
  [EventType.AppWillEnterForeground]: makeReader(SDL_CommonEvent),
  [EventType.AppDidEnterForeground]: makeReader(SDL_CommonEvent),
  // [EventType.Display]: makeReader(SDL_DisplayEvent),
  [EventType.KeyDown]: makeReader(SDL_KeyboardEvent),
  [EventType.KeyUp]: makeReader(SDL_KeyboardEvent),
  [EventType.MouseMotion]: makeReader(SDL_MouseMotionEvent),
  [EventType.MouseButtonDown]: makeReader(SDL_MouseButtonEvent),
  [EventType.MouseButtonUp]: makeReader(SDL_MouseButtonEvent),
  [EventType.MouseWheel]: makeReader(SDL_MouseWheelEvent),
  [EventType.AudioDeviceAdded]: makeReader(SDL_AudioDeviceEvent),
  [EventType.AudioDeviceRemoved]: makeReader(SDL_AudioDeviceEvent),
  [EventType.User]: makeReader(SDL_CommonEvent),
  [EventType.Last]: makeReader(SDL_LastEvent),
  // TODO: Unrechable code
  [EventType.Draw]: makeReader(SDL_CommonEvent),
};

export class Window {
  constructor(private raw: Deno.UnsafePointer) {}

  canvas() {
    // Hardware accelerated canvas
    const raw = sdl2.symbols.SDL_CreateRenderer(this.raw, -1, 0);
    return new Canvas(this.raw, raw);
  }

  *events() {
    while (true) {
      const event = Deno.UnsafePointer.of(eventBuf);
      const pending = sdl2.symbols.SDL_PollEvent(event) == 1;
      if (!pending) {
        yield { type: EventType.Draw };
      }
      const view = new Deno.UnsafePointerView(event);
      const type = view.getUint32();
      const ev = eventReader[type as EventType];
      if (!ev) {
        // throw new Error(`Unknown event type: ${type}`);
        continue;
      }
      yield { ...ev(view) };
    }
  }
}

export class WindowBuilder {
  // deno-lint-ignore no-inferrable-types
  private flags: number = 0;
  constructor(
    private title: string,
    private width: number,
    private height: number,
  ) {}

  build() {
    const title = asCString(this.title);
    const window = sdl2.symbols.SDL_CreateWindow(
      title,
      0x2FFF0000,
      0x2FFF0000,
      this.width,
      this.height,
      this.flags,
    );
    return new Window(window);
  }

  fullscreen() {
    this.flags |= 0x00000001;
    return this;
  }

  resizable() {
    this.flags |= 0x00000002;
    return this;
  }

  borderless() {
    this.flags |= 0x00000004;
    return this;
  }

  alwaysOnTop() {
    this.flags |= 0x00000008;
    return this;
  }

  openGL() {
    this.flags |= 0x00000010;
    return this;
  }

  highDPI() {
    this.flags |= 0x00000020;
    return this;
  }

  inputGrabbed() {
    this.flags |= 0x00000040;
    return this;
  }

  inputFocus() {
    this.flags |= 0x00000080;
    return this;
  }

  mouseFocus() {
    this.flags |= 0x00000100;
    return this;
  }

  foreign() {
    this.flags |= 0x00000200;
    return this;
  }

  allowHighDPI() {
    this.flags |= 0x00000400;
    return this;
  }
}

export class VideoSubsystem {
  currentVideoDriver(): string {
    const buf = sdl2.symbols.SDL_GetCurrentVideoDriver();
    if (buf === null) {
      throw new Error("SDL_GetCurrentVideoDriver failed");
    }
    const view = new Deno.UnsafePointerView(buf);
    return view.getCString();
  }
}

export enum Scancode {
  Unknown = 0,
  A = 4,
  B = 5,
  C = 6,
  D = 7,
  E = 8,
  F = 9,
  G = 10,
  H = 11,
  I = 12,
  J = 13,
  K = 14,
  L = 15,
  M = 16,
  N = 17,
  O = 18,
  P = 19,
  Q = 20,
  R = 21,
  S = 22,
  T = 23,
  U = 24,
  V = 25,
  W = 26,
  X = 27,
  Y = 28,
  Z = 29,
  Num_1 = 30,
  Num_2 = 31,
  Num_3 = 32,
  Num_4 = 33,
  Num_5 = 34,
  Num_6 = 35,
  Num_7 = 36,
  Num_8 = 37,
  Num_9 = 38,
  Num_0 = 39,
  Return = 40,
  Escape = 41,
  Backspace = 42,
  Tab = 43,
  Space = 44,
  Minus = 45,
  Equals = 46,
  LeftBracket = 47,
  RightBracket = 48,
  Backslash = 49,
  NonUSHash = 50,
  Semicolon = 51,
  Apostrophe = 52,
  Grave = 53,
  Comma = 54,
  Period = 55,
  Slash = 56,
  Capslock = 57,
  F1 = 58,
  F2 = 59,
  F3 = 60,
  F4 = 61,
  F5 = 62,
  F6 = 63,
  F7 = 64,
  F8 = 65,
  F9 = 66,
  F10 = 67,
  F11 = 68,
  F12 = 69,
  PrintScreen = 70,
  ScrollLock = 71,
  Pause = 72,
  Insert = 73,
  Home = 74,
  PageUp = 75,
  Delete = 76,
  End = 77,
  PageDown = 78,
  Right = 79,
  Left = 80,
  Down = 81,
  Up = 82,
  NumLockClear = 83,
  Kp_Divide = 84,
  Kp_Multiply = 85,
  Kp_Minus = 86,
  Kp_Plus = 87,
  Kp_Enter = 88,
  Kp_1 = 89,
  Kp_2 = 90,
  Kp_3 = 91,
  Kp_4 = 92,
  Kp_5 = 93,
  Kp_6 = 94,
  Kp_7 = 95,
  Kp_8 = 96,
  Kp_9 = 97,
  Kp_0 = 98,
  Kp_Period = 99,
  NonUSBackslash = 100,
  Application = 101, /**< windows contextual menu, compose */
  Power = 102,
  Kp_Equals = 103,
  F13 = 104,
  F14 = 105,
  F15 = 106,
  F16 = 107,
  F17 = 108,
  F18 = 109,
  F19 = 110,
  F20 = 111,
  F21 = 112,
  F22 = 113,
  F23 = 114,
  F24 = 115,
  Execute = 116,
  Help = 117,
  Menu = 118,
  Select = 119,
  Stop = 120,
  Again = 121,   /**< redo */
  Undo = 122,
  Cut = 123,
  Copy = 124,
  Paste = 125,
  Find = 126,
  Mute = 127,
  VolumeUp = 128,
  VolumeDown = 129,
  Kp_Comma = 133,
  Kp_EqualsAs400 = 134,
  International1 = 135,
  International2 = 136,
  International3 = 137, /**< Yen */
  International4 = 138,
  International5 = 139,
  International6 = 140,
  International7 = 141,
  International8 = 142,
  International9 = 143,
  Lang1 = 144, /**< Hangul/English toggle */
  Lang2 = 145, /**< Hanja conversion */
  Lang3 = 146, /**< Katakana */
  Lang4 = 147, /**< Hiragana */
  Lang5 = 148, /**< Zenkaku/Hankaku */
  Lang6 = 149, /**< reserved */
  Lang7 = 150, /**< reserved */
  Lang8 = 151, /**< reserved */
  Lang9 = 152, /**< reserved */
  AltErase = 153, /**< Erase-Eaze */
  SysReq = 154,
  Cancel = 155,
  Clear = 156,
  Prior = 157,
  Return2 = 158,
  Separator = 159,
  Out = 160,
  Oper = 161,
  ClearAgain = 162,
  CrSel = 163,
  ExSel = 164,
  Kp_00 = 176,
  Kp_000 = 177,
  ThousandsSeparator = 178,
  DecimalSeparator = 179,
  CurrencyUnit = 180,
  CurrencySubunit = 181,
  Kp_LeftParen = 182,
  Kp_RightParen = 183,
  Kp_LeftBrace = 184,
  Kp_RightBrace = 185,
  Kp_Tab = 186,
  Kp_Backspace = 187,
  Kp_A = 188,
  Kp_B = 189,
  Kp_C = 190,
  Kp_D = 191,
  Kp_E = 192,
  Kp_F = 193,
  Kp_Xor = 194,
  Kp_Power = 195,
  Kp_Percent = 196,
  Kp_Less = 197,
  Kp_Greater = 198,
  Kp_Ampersand = 199,
  Kp_DblAmpersand = 200,
  Kp_VerticalBar = 201,
  Kp_DblVerticalBar = 202,
  Kp_Colon = 203,
  Kp_Hash = 204,
  Kp_Space = 205,
  Kp_At = 206,
  Kp_Exclam = 207,
  Kp_MemStore = 208,
  Kp_MemRecall = 209,
  Kp_MemClear = 210,
  Kp_MemAdd = 211,
  Kp_MemSubtract = 212,
  Kp_MemMultiply = 213,
  Kp_MemDivide = 214,
  Kp_PlusMinus = 215,
  Kp_Clear = 216,
  Kp_ClearEntry = 217,
  Kp_Binary = 218,
  Kp_Octal = 219,
  Kp_Decimal = 220,
  Kp_Hexadecimal = 221,
  LCtrl = 224,
  LShift = 225,
  LAlt = 226, /**< alt, option */
  LGui = 227, /**< windows, command (apple), meta */
  RCtrl = 228,
  RShift = 229,
  RAlt = 230, /**< alt gr, option */
  RGui = 231, /**< windows, command (apple), meta */
  Mode = 257,
  AudioNext = 258,
  AudioPrev = 259,
  AudioStop = 260,
  AudioPlay = 261,
  AudioMute = 262,
  MediaSelect = 263,
  Www = 264,
  Mail = 265,
  Calculator = 266,
  Computer = 267,
  Ac_Search = 268,
  Ac_Home = 269,
  Ac_Back = 270,
  Ac_Forward = 271,
  Ac_Stop = 272,
  Ac_Refresh = 273,
  Ac_Bookmarks = 274,
  BrightnessDown = 275,
  BrightnessUp = 276,
  DisplaySwitch = 277,
  KbdIllumToggle = 278,
  KbdIllumDown = 279,
  KbdIllumUp = 280,
  Eject = 281,
  Sleep = 282,
  App1 = 283,
  App2 = 284,
  AudioRewind = 285,
  AudioFastforward = 286,
  NumScancodes = 512
}

export enum KeyCode {
  Unknown = 0x0,
  Return = 0xD,
  Escape = 0x1B,
  Backspace = 0x8,
  Tab = 0x9,
  Space = 0x20,
  Exclaim = 0x21,
  QuoteDbl = 0x22,
  Hash = 0x23,
  Percent = 0x25,
  Dollar = 0x24,
  Ampersand = 0x26,
  Quote = 0x27,
  LeftParen = 0x28,
  RightParen = 0x29,
  Asterisk = 0x2A,
  Plus = 0x2B,
  Comma = 0x2C,
  Minus = 0x2D,
  Period = 0x2E,
  Slash = 0x2F,
  Num_0 = 0x30,
  Num_1 = 0x31,
  Num_2 = 0x32,
  Num_3 = 0x33,
  Num_4 = 0x34,
  Num_5 = 0x35,
  Num_6 = 0x36,
  Num_7 = 0x37,
  Num_8 = 0x38,
  Num_9 = 0x39,
  Colon = 0x3A,
  Semicolon = 0x3B,
  Less = 0x3C,
  Equals = 0x3D,
  Greater = 0x3E,
  Question = 0x3F,
  At = 0x40,
  LeftBracket = 0x5B,
  Backslash = 0x5C,
  RightBracket = 0x5D,
  Caret = 0x5E,
  Underscore = 0x5F,
  Backquote = 0x60,
  A = 0x61,
  B = 0x62,
  C = 0x63,
  D = 0x64,
  E = 0x65,
  F = 0x66,
  G = 0x67,
  H = 0x68,
  I = 0x69,
  J = 0x6A,
  K = 0x6B,
  L = 0x6C,
  M = 0x6D,
  N = 0x6E,
  O = 0x6F,
  P = 0x70,
  Q = 0x71,
  R = 0x72,
  S = 0x73,
  T = 0x74,
  U = 0x75,
  V = 0x76,
  W = 0x77,
  X = 0x78,
  Y = 0x79,
  Z = 0x7A,
  Capslock = 0x40000039,
  F1 = 0x4000003A,
  F2 = 0x4000003B,
  F3 = 0x4000003C,
  F4 = 0x4000003D,
  F5 = 0x4000003E,
  F6 = 0x4000003F,
  F7 = 0x40000040,
  F8 = 0x40000041,
  F9 = 0x40000042,
  F10 = 0x40000043,
  F11 = 0x40000044,
  F12 = 0x40000045,
  PrintScreen = 0x40000046,
  ScrollLock = 0x40000047,
  Pause = 0x40000048,
  Insert = 0x40000049,
  Home = 0x4000004A,
  PageUp = 0x4000004B,
  Delete = 0x7F,
  End = 0x4000004D,
  PageDown = 0x4000004E,
  Right = 0x4000004F,
  Left = 0x40000050,
  Down = 0x40000051,
  Up = 0x40000052,
  NumlockClear = 0x40000053,
  Kp_Divide = 0x40000054,
  Kp_Multiply = 0x40000055,
  Kp_Minus = 0x40000056,
  Kp_Plus = 0x40000057,
  Kp_Enter = 0x40000058,
  Kp_1 = 0x40000059,
  Kp_2 = 0x4000005A,
  Kp_3 = 0x4000005B,
  Kp_4 = 0x4000005C,
  Kp_5 = 0x4000005D,
  Kp_6 = 0x4000005E,
  Kp_7 = 0x4000005F,
  Kp_8 = 0x40000060,
  Kp_9 = 0x40000061,
  Kp_0 = 0x40000062,
  Kp_Period = 0x40000063,
  Application = 0x40000065,
  Power = 0x40000066,
  Kp_Equals = 0x40000067,
  F13 = 0x40000068,
  F14 = 0x40000069,
  F15 = 0x4000006A,
  F16 = 0x4000006B,
  F17 = 0x4000006C,
  F18 = 0x4000006D,
  F19 = 0x4000006E,
  F20 = 0x4000006F,
  F21 = 0x40000070,
  F22 = 0x40000071,
  F23 = 0x40000072,
  F24 = 0x40000073,
  Execute = 0x40000074,
  Help = 0x40000075,
  Menu = 0x40000076,
  Select = 0x40000077,
  Stop = 0x40000078,
  Again = 0x40000079,
  Undo = 0x4000007A,
  Cut = 0x4000007B,
  Copy = 0x4000007C,
  Paste = 0x4000007D,
  Find = 0x4000007E,
  Mute = 0x4000007F,
  VolumeUp = 0x40000080,
  VolumeDown = 0x40000081,
  Kp_Comma = 0x40000085,
  Kp_EqualsAs400 = 0x40000086,
  AltErase = 0x40000099,
  SysReq = 0x4000009A,
  Cancel = 0x4000009B,
  Clear = 0x4000009C,
  Prior = 0x4000009D,
  Return2 = 0x4000009E,
  Separator = 0x4000009F,
  Out = 0x400000A0,
  Oper = 0x400000A1,
  ClearAgain = 0x400000A2,
  CrSel = 0x400000A3,
  ExSel = 0x400000A4,
  Kp_00 = 0x400000B0,
  Kp_000 = 0x400000B1,
  ThousandsSeparator = 0x400000B2,
  DecimalSeparator = 0x400000B3,
  CurrencyUnit = 0x400000B4,
  CurrencySubunit = 0x400000B5,
  Kp_LeftParen = 0x400000B6,
  Kp_RightParen = 0x400000B7,
  Kp_LeftBrace = 0x400000B8,
  Kp_RightBrace = 0x400000B9,
  Kp_Tab = 0x400000BA,
  Kp_Backspace = 0x400000BB,
  Kp_A = 0x400000BC,
  Kp_B = 0x400000BD,
  Kp_C = 0x400000BE,
  Kp_D = 0x400000BF,
  Kp_E = 0x400000C0,
  Kp_F = 0x400000C1,
  Kp_Xor = 0x400000C2,
  Kp_Power = 0x400000C3,
  Kp_Percent = 0x400000C4,
  Kp_Less = 0x400000C5,
  Kp_Greater = 0x400000C6,
  Kp_Ampersand = 0x400000C7,
  Kp_DblAmpersand = 0x400000C8,
  Kp_VerticalBar = 0x400000C9,
  Kp_DblVerticalBar = 0x400000CA,
  Kp_Colon = 0x400000CB,
  Kp_Hash = 0x400000CC,
  Kp_Space = 0x400000CD,
  Kp_At = 0x400000CE,
  Kp_ExClam = 0x400000CF,
  Kp_MemStore = 0x400000D0,
  Kp_MemRecall = 0x400000D1,
  Kp_MemClear = 0x400000D2,
  Kp_MemAdd = 0x400000D3,
  Kp_MemSubtract = 0x400000D4,
  Kp_MemMultiply = 0x400000D5,
  Kp_MemDivide = 0x400000D6,
  Kp_PlusMinus = 0x400000D7,
  Kp_Clear = 0x400000D8,
  Kp_ClearEntry = 0x400000D9,
  Kp_Binary = 0x400000DA,
  Kp_Octal = 0x400000DB,
  Kp_Decimal = 0x400000DC,
  Kp_Hexadecimal = 0x400000DD,
  LCtrl = 0x400000E0,
  LShift = 0x400000E1,
  LAlt = 0x400000E2,
  LGui = 0x400000E3,
  RCtrl = 0x400000E4,
  RShift = 0x400000E5,
  RAlt = 0x400000E6,
  RGui = 0x400000E7,
  Mode = 0x40000101,
  AudioNext = 0x40000102,
  AudioPrev = 0x40000103,
  AudioStop = 0x40000104,
  AudioPlay = 0x40000105,
  AudioMute = 0x40000106,
  MediaSelect = 0x40000107,
  Www = 0x40000108,
  Mail = 0x40000109,
  Calculator = 0x4000010A,
  Computer = 0x4000010B,
  Ac_Search = 0x4000010C,
  Ac_Home = 0x4000010D,
  Ac_Back = 0x4000010E,
  Ac_Forward = 0x4000010F,
  Ac_Stop = 0x40000110,
  Ac_Refresh = 0x40000111,
  Ac_Bookmarks = 0x40000112,
  BrightnessDown = 0x40000113,
  BrightnessUp = 0x40000114,
  DisplaySwitch = 0x40000115,
  KbdIllumToggle = 0x40000116,
  KbdIllumDown = 0x40000117,
  KbdIllumUp = 0x40000118,
  Eject = 0x40000119,
  Sleep = 0x4000011A,
  App1 = 0x4000011B,
  App2 = 0x4000011C,
  AudioRewind = 0x4000011D,
  AudioFastforward = 0x4000011E,
}

export enum KeyMod
{
  None = 0x0000,
  LShift = 0x0001,
  RShift = 0x0002,
  LCtrl = 0x0040,
  RCtrl = 0x0080,
  LAlt = 0x0100,
  RAlt = 0x0200,
  LGui = 0x0400,
  RGui = 0x0800,
  Num = 0x1000,
  Caps = 0x2000,
  Mode = 0x4000,
  Scroll = 0x8000,

  Ctrl = LCtrl | RCtrl,
  Shift = LShift | RShift,
  Alt = LAlt | RAlt,
  Gui = LGui | RGui,

  Reserved = Scroll /* This is for source-level compatibility with SDL 2.0.0. */
}

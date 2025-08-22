# WASM Image Processor
> Process images offline in the Browser.

**⚠️ Early Development Notice**: This project is in active development. APIs may change and there is no npm package available yet. Use at your own risk for production applications.

A high-performance image processing toolkit built with Rust and WebAssembly. Process images entirely client-side with no server uploads required.

## Features

- **Offline Processing**: All image operations happen in your browser
- **High Performance**: Powered by Rust and WebAssembly
- **No Data Transfer**: Images never leave your device
- **PWA Icon Generation**: Create complete icon sets for Progressive Web Apps
- **Multiple Formats**: Support for JPEG, PNG, WebP, and more
- **Batch Processing**: Generate multiple sizes from a single image

## Demo

Try the live demo at: [https://stanleymasinde.github.io/wasm-image-processor/](https://stanleymasinde.github.io/wasm-image-processor/)

- **Basic Resizer**: Resize images to custom dimensions
- **PWA Icon Generator**: Generate complete icon sets for web apps

## Current Features

### Image Resizing
- Resize images to any dimensions up to 5000x5000 pixels
- Maintain aspect ratio or force specific dimensions
- High-quality filtering algorithms


## Installation

**Note**: No npm package is available yet. You need to build from source.

### Prerequisites

- [Rust](https://rustup.rs/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)

### Building

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wasm-image-processor.git
cd wasm-image-processor
```

2. Build the WASM package:
```bash
wasm-pack build --target web
```

3. Copy files to demo directory:
```bash
# Copy JS and WASM files to demo folder
./prep-demo.sh
```

4. Serve the demo locally:
```bash
# Using Node.js
npx serve .

# Or any other static file server
```

5. Open `http://localhost:3000/demo` in your browser

### Usage

Include the WASM module in your web page:

```html
<script type="module">
  import init, { resize_image } from "./pwa_image_generator.js";
  
  init().then(() => {
    // WASM module is ready
    const imageData = new Uint8Array(/* your image data */);
    const resizedBytes = resize_image(Array.from(imageData), 500);
    
    // Use resizedBytes as needed
  });
</script>
```

### API Reference

#### `resize_image(image_data: Vec<u8>, side: u32) -> Vec<u8>`

Resizes an image to a square with the specified side length.

**Parameters:**
- `image_data`: Image data as a byte array
- `side`: Target width/height in pixels (1-5000)

**Returns:**
- PNG-encoded image data as byte array

**Example:**
```javascript
const resizedBytes = resize_image(imageBytes, 256);
const blob = new Blob([new Uint8Array(resizedBytes)], { type: 'image/png' });
```

## Project Structure

```
wasm-image-processor/
├── src/
│   └─- lib.rs              # Main Rust library  
├── demo/
│   ├── index.html          # Basic resizer demo
│   ├── pwa-generator.html  # PWA icon generator
│   ├── pwa_image_generator.js    # Generated JS bindings
│   └── pwa_image_generator_bg.wasm  # Generated WASM binary
├── pkg/                    # wasm-pack output
├── tests/                  # Test files
├── copy_pkg.sh            # Build script
├── Cargo.toml
└── README.md
```

## Development

### Running Tests

```bash
# Run Rust tests
cargo test

# Test with sample images
cargo test test_resize_logic --lib
```

### Adding New Features

The codebase is structured to easily add new image processing functions:

1. Add your function to `src/lib.rs`
2. Mark it with `#[wasm_bindgen]`
3. Rebuild with `wasm-pack build --target web`
4. Update the demo pages to use your new function

## Roadmap

**Near Term:**
- [ ] Stable API design
- [ ] npm package publication
- [ ] Comprehensive documentation
- [ ] CI/CD pipeline

**Future Features:**
- [ ] Image format conversion (PNG ↔ JPEG ↔ WebP)
- [ ] Image compression with quality settings
- [ ] Batch processing for multiple images
- [ ] Image filters (blur, sharpen, brightness, contrast)
- [ ] Custom crop functionality
- [ ] Image rotation and flipping
- [ ] Metadata preservation and editing
- [ ] Advanced resizing algorithms

## Browser Support

- Chrome/Edge 57+
- Firefox 52+
- Safari 11+
- Any browser with WebAssembly support

## Performance

Processing is done entirely client-side using WebAssembly, providing:
- **Fast processing**: Near-native performance
- **Privacy**: Images never leave your device
- **Offline capability**: Works without internet connection
- **Scalability**: No server resources required

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Rust](https://www.rust-lang.org/) and [wasm-bindgen](https://rustwasm.github.io/wasm-bindgen/)
- Image processing powered by the [image](https://github.com/image-rs/image) crate
- Inspired by the need for client-side image processing tools

import aiohttp
from imouapi.api import ImouAPIClient
from imouapi.device import ImouDiscoverService, ImouDevice

app_id = '<app-id>'
app_secret = '<app-secret>'

async def main():
    connector = aiohttp.TCPConnector(ssl=False)
    async with aiohttp.ClientSession(connector=connector) as session:
        api_client = ImouAPIClient(app_id, app_secret, session)
        discover_service = ImouDiscoverService(api_client)
        discovered_devices = await discover_service.async_discover_devices()
        device_id = discovered_devices['Backyard']._device_id

        try:
            stream_info = await api_client.async_api_getLiveStreamInfo(device_id)
            print('Ongoing stream found, unbinding')
            for stream in stream_info['streams']:
                await api_client.async_api_unbindLive(stream['liveToken'])
                print(f'Unbinding stream with token {stream['liveToken']}')
        finally:
            await api_client.async_api_bindDeviceLive(device_id, 'HD')
            print('Starting stream')
            stream_info = await api_client.async_api_getLiveStreamInfo(device_id)
            for stream in stream_info['streams']:
                print(stream['hls'])

import asyncio
asyncio.run(main())
